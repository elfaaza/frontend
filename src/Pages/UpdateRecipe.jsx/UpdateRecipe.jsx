import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: "1",
    image: null,
    ingredients: [""],
    steps: [{ instruction: "", image: null }],
  });

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const recipeRes = await fetch(`http://127.0.0.1:8000/api/recipes/${id}`, { headers });
        if (!recipeRes.ok) throw new Error("Gagal mengambil data resep");
        const recipeData = await recipeRes.json();

        const ingredientsRes = await fetch(`http://127.0.0.1:8000/api/recipe-ingredients`, { headers });
        const ingredientsData = ingredientsRes.ok ? await ingredientsRes.json() : { data: [] };

        const stepsRes = await fetch(`http://127.0.0.1:8000/api/recipe-steps`, { headers });
        const stepsData = stepsRes.ok ? await stepsRes.json() : { data: [] };

        const filteredSteps = stepsData.data.filter((step) => step.recipe === recipeData.data.title);

        setFormData({
          title: recipeData.data.title,
          description: recipeData.data.description,
          category_id: recipeData.data.category_id,
          image: null,
          ingredients: ingredientsData.data
            .filter((item) => item.recipe_id == id)
            .map((item) => item.ingredient),
          steps: filteredSteps.map((step) => ({
            instruction: step.instruction,
            image: null,
          })),
        });
      } catch (error) {
        console.error("Error fetching recipe data:", error);
        setError("Gagal mengambil data resep.");
      }
    };

    fetchRecipeData();
  }, [id]);

  const handleChange = (e, index, field) => {
    if (field === "image") {
      setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    } else if (field === "ingredient") {
      setFormData((prev) => {
        const newIngredients = [...prev.ingredients];
        newIngredients[index] = e.target.value;
        return { ...prev, ingredients: newIngredients };
      });
    } else if (field === "step") {
      setFormData((prev) => {
        const newSteps = [...prev.steps];
        newSteps[index] = {
          ...newSteps[index],
          [e.target.name]: e.target.name === "image" ? e.target.files[0] : e.target.value,
        };
        return { ...prev, steps: newSteps };
      });
    } else {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleAddIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
  };

  const handleRemoveIngredient = (index) => {
    setFormData((prev) => {
      const newIngredients = prev.ingredients.filter((_, i) => i !== index);
      return { ...prev, ingredients: newIngredients };
    });
  };

  const handleAddStep = () => {
    setFormData((prev) => ({
      ...prev,
      steps: [...prev.steps, { instruction: "", image: null }],
    }));
  };

  const handleRemoveStep = (index) => {
    setFormData((prev) => {
      const newSteps = prev.steps.filter((_, i) => i !== index);
      return { ...prev, steps: newSteps };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!id) {
      setError("ID resep tidak ditemukan");
      return;
    }

    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category_id", formData.category_id);

    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      // Update resep utama
      const recipeResponse = await fetch(`http://127.0.0.1:8000/api/recipes/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
        mode: 'cors'
      });

      if (!recipeResponse.ok) throw new Error("Gagal memperbarui resep");

      // Update bahan-bahan
      await fetch(`http://127.0.0.1:8000/api/recipe-ingredients/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ingredients: formData.ingredients.map((ingredient) => ({
            id: ingredient.id || null, // Kirim id jika ada
            ingredient: ingredient.ingredient,
          })),
        }),
      });

      // Update langkah-langkah
      const stepData = new FormData();
      stepData.append("recipe_id", id);
      formData.steps.forEach((step, index) => {
        stepData.append(`steps[${index}][instruction]`, step.instruction);
        if (step.image) {
          stepData.append(`steps[${index}][image]`, step.image);
        }
        if (step.id) {
          stepData.append(`steps[${index}][id]`, step.id);
        }
      });

      await fetch(`http://127.0.0.1:8000/api/recipe-steps/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: stepData,
      });

      navigate(`/recipe/${id}`);
    } catch (error) {
      console.error("Error updating recipe:", error);
      setError("Gagal memperbarui resep. Silakan coba lagi.");
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f9f9] to-[#f0e6e1] py-12 px-4 pt-40 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-[#a8613b] text-center mb-6">Edit Resep</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Judul Resep</label>
            <input
              type="text"
              name="title"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#a8613b]"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
            <textarea
              name="description"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#a8613b]"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Gambar</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#a8613b]"
              onChange={(e) => handleChange(e, null, "image")}
            />
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#a8613b] mb-4">Bahan-Bahan</h2>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#a8613b]"
                  value={ingredient}
                  onChange={(e) => handleChange(e, index, "ingredient")}
                  placeholder="Masukkan bahan"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className=" text-white px-4 py-2 rounded-lg  transition duration-300"
                >
                  ❌
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddIngredient}
              className="bg-[#a8613b] text-white px-4 py-2 rounded-lg hover:bg-[#8c4c2f] transition duration-300"
            >
              Tambah Bahan
            </button>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#a8613b] mb-4">Langkah-Langkah</h2>
            {formData.steps.map((step, index) => (
              <div key={index} className="border border-gray-300 rounded-lg p-4 mb-4">
                <textarea
                  name="instruction"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#a8613b]"
                  value={step.instruction}
                  onChange={(e) => handleChange(e, index, "step")}
                  placeholder="Instruksi langkah"
                  required
                />
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="w-full border border-gray-300 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-[#a8613b]"
                  onChange={(e) => handleChange(e, index, "step")}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveStep(index)}
                  className=" text-white px-4 py-2 rounded-lg mt-2  transition duration-300"
                >
                  ❌ Hapus Langkah
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddStep}
              className="bg-[#a8613b] text-white px-4 py-2 rounded-lg hover:bg-[#8c4c2f] transition duration-300"
            >
              Tambah Langkah
            </button>
          </div>

          <button
            type="submit"
            className="bg-[#a8613b] text-white px-6 py-3 rounded-lg w-full hover:bg-[#8c4c2f] transition duration-300 transform hover:scale-105"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRecipe;