import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetailRecipe = () => {
  const { id } = useParams();
  const currentRecipeId = parseInt(id, 10);
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [newCommentImage, setNewCommentImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const categoryLabels = {
    1: "Breakfast",
    2: "Lunch",
    3: "Dinner",
    4: "Beverage",
    5: "Dessert",
    6: "Snack",
  };

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);

        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const recipeRes = await fetch(`http://127.0.0.1:8000/api/recipes/${id}`, { headers });
        if (!recipeRes.ok) throw new Error("Gagal mengambil data resep");
        const recipeData = await recipeRes.json();
        setRecipe(recipeData.data);

        let fetchedIngredients = [];
        if (userData?.role === "chef") {
          const ingredientsRes = await fetch(`http://127.0.0.1:8000/api/recipe-ingredients`, { headers });
          if (ingredientsRes.ok) {
            const ingredientsData = await ingredientsRes.json();
            fetchedIngredients = ingredientsData.data.filter((item) => item.recipe_id == id);
          }
        }
        setIngredients(fetchedIngredients);

        const stepsRes = await fetch(`http://127.0.0.1:8000/api/recipe-steps`, { headers });
        if (stepsRes.ok) {
          const stepsData = await stepsRes.json();
          const filteredSteps = stepsData.data.filter((step) => step.recipe === recipeData.data.title);
          setSteps(filteredSteps);
        }

        const reviewsRes = await fetch(`http://127.0.0.1:8000/api/recipe-reviews`, { headers });
        if (reviewsRes.ok) {
          const reviewsData = await reviewsRes.json();
          setReviews(reviewsData.data);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const handleUpdate = () => {
    navigate(`/recipe/edit/${id}`, {
      state: {
        recipe,
        ingredients,
        steps,
      },
    });
  };

  const handleDelete = async () => {
    if (!window.confirm("Yakin ingin menghapus resep ini?")) return;
    const token = localStorage.getItem("token");
    try {
      await fetch(`http://127.0.0.1:8000/api/recipes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/");
    } catch (error) {
      console.error("Gagal menghapus resep:", error);
    }
  };

  const handlePostComment = async () => {
    if (!newComment.trim() && !newCommentImage) {
      alert("Komentar atau gambar harus diisi.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("recipe_id", id);
      formData.append("user_id", user?.id);
      formData.append("content", newComment);
      if (newCommentImage) {
        formData.append("image", newCommentImage);
      }

      const token = localStorage.getItem("token");

      const response = await fetch("http://127.0.0.1:8000/api/recipe-reviews", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error("Gagal mengirim komentar.");

      const data = await response.json();
      console.log("Response Data:", data);

      if (data.recipe_review) {
        setReviews((prevReviews) => [
          ...prevReviews,
          {
            id: data.recipe_review.id,
            user: data.recipe_review.user,
            recipe_id: parseInt(data.recipe_review.recipe_id, 10),
            content: data.recipe_review.content,
            image: data.recipe_review.image
              ? `http://127.0.0.1:8000/storage/${data.recipe_review.image}`
              : null,
          },
        ]);
      }

      setNewComment("");
      setNewCommentImage(null);
    } catch (error) {
      console.error("Gagal mengirim komentar:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Yakin ingin menghapus komentar ini?")) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://127.0.0.1:8000/api/recipe-reviews/${commentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Gagal menghapus komentar.");

      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== commentId));
    } catch (error) {
      console.error("Gagal menghapus komentar:", error);
    }
  };

  if (loading) return <p className="text-center mt-20 text-lg font-semibold">Loading...</p>;
  if (!recipe) return <p className="text-center text-red-500 mt-20 text-lg font-semibold">Resep tidak ditemukan!</p>;

  return (
    <div className="container mx-auto p-6 pt-40 max-w-4xl bg-gradient-to-br from-[#f9f9f9] to-[#f0e6e1] rounded-xl shadow-2xl">
      <div className="bg-[#a8613b] text-white p-6 rounded-t-xl">
        <h1 className="text-4xl font-bold mb-2">{recipe.title}</h1>
        <p className="text-lg">
          Dibuat oleh: <span className="font-semibold">{recipe.chef || "Tidak diketahui"}</span>
        </p>
        <p className="text-lg">
          Kategori: <span className="font-semibold">{categoryLabels[recipe.category_id] || "Tidak diketahui"}</span>
        </p>
      </div>

      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-96 object-cover rounded-b-xl shadow-lg"
      />

      <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-[#a8613b] mb-4">Deskripsi</h2>
        <p className="text-gray-700">{recipe.description}</p>
      </div>

      {user?.role === "chef" && (
        <div className="mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-[#a8613b] mb-4">Bahan-Bahan</h2>
            <ul className="list-disc ml-6 text-gray-700">
              {ingredients.map((item) => (
                <li key={item.id} className="mb-2">
                  {item.ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-2xl font-bold text-[#a8613b] mb-4">Langkah-Langkah</h2>
            <ol className="list-decimal ml-6 space-y-4">
              {steps.map((step, index) => (
                <li key={index} className="text-gray-700">
                  {step.instruction}
                  {step.image && (
                    <img
                      src={step.image}
                      alt={`Langkah ${step.step_no}`}
                      className="mt-2 w-full max-w-xs rounded-lg shadow-sm"
                    />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {user?.role === "chef" && (
        <div className="flex space-x-4 mt-6">
          <button
            onClick={handleUpdate}
            className="bg-[#a8613b] text-white px-6 py-2 rounded-lg hover:bg-[#8c4c2f] transition duration-300"
          >
            Update Resep
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Hapus Resep
          </button>
        </div>
      )}

      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-[#a8613b] mb-4">Komentar</h2>
        {reviews && reviews.length > 0 ? (
          reviews
            .filter((review) => review.recipe_id === currentRecipeId)
            .map((review, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-sm bg-gray-50 mb-4">
                <p className="font-semibold text-gray-800">
                  {review?.user ? review.user : "Pengguna tidak diketahui"}
                </p>
                <p className="text-gray-700 mt-2">{review?.content || "Tidak ada komentar."}</p>
                {review?.image && (
                  <img
                    src={review.image}
                    alt="Komentar"
                    className="mt-2 w-full max-w-xs rounded-lg shadow-sm"
                  />
                )}
                {user?.role === "admin" && (
                  <button
                    onClick={() => handleDeleteComment(review?.id)}
                    className="text-red-500 text-sm mt-2 hover:text-red-700"
                  >
                    Hapus
                  </button>
                )}
              </div>
            ))
        ) : (
          <p className="text-gray-500">Belum ada komentar.</p>
        )}
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-[#a8613b] mb-4">Tambah Komentar</h2>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#a8613b]"
          placeholder="Tulis komentar..."
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewCommentImage(e.target.files[0])}
          className="mt-2 w-full border border-gray-300 rounded-lg p-2"
        />
        <button
          onClick={handlePostComment}
          className="bg-[#a8613b] text-white px-6 py-2 rounded-lg mt-4 hover:bg-[#8c4c2f] transition duration-300"
        >
          Kirim Komentar
        </button>
      </div>
    </div>
  );
};

export default DetailRecipe;