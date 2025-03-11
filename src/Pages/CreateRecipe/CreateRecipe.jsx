import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateRecipe = () => {
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
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e, index, field) => {
    if (field === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else if (field === "ingredient") {
      const newIngredients = [...formData.ingredients];
      newIngredients[index] = e.target.value;
      setFormData({ ...formData, ingredients: newIngredients });
    } else if (field === "step") {
      const newSteps = [...formData.steps];
      newSteps[index][e.target.name] =
        e.target.name === "image" ? e.target.files[0] : e.target.value;
      setFormData({ ...formData, steps: newSteps });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleAddIngredient = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ""] });
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...formData.ingredients];
    newIngredients.splice(index, 1);
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const handleAddStep = () => {
    setFormData({
      ...formData,
      steps: [...formData.steps, { instruction: "", image: null }],
    });
  };

  const handleRemoveStep = (index) => {
    const newSteps = [...formData.steps];
    newSteps.splice(index, 1);
    setFormData({ ...formData, steps: newSteps });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.image) {
      setError("Mohon pilih gambar untuk resep!");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category_id", formData.category_id);
    data.append("chef_id", user.id);
    data.append("image", formData.image);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/recipes", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (!response.ok) throw new Error("Gagal membuat resep");

      navigate("/recipe");
    } catch (error) {
      console.error(error);
      setError("Terjadi kesalahan. Coba lagi nanti.");
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto p-4 pt-40 max-w-2xl bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#a8613b]">
        Tambah Resep
      </h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Judul Resep
          </label>
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
          <label className="block text-sm font-medium text-gray-700">
            Deskripsi
          </label>
          <textarea
            name="description"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#a8613b]"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Kategori
          </label>
          <select
            name="kategori"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#a8613b]"
            value={formData.category_id}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Pilih Kategori
            </option>
            <option value="1">Breakfast</option>
            <option value="2">Lunch</option>
            <option value="3">Dinner</option>
            <option value="4">Beverage</option>
            <option value="5">Dessert</option>
            <option value="6">Snack</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gambar
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#a8613b]"
            onChange={(e) => handleChange(e, null, "image")}
          />
        </div>

        {user.role !== "admin" && (
          <>
            <div>
              <h2 className="text-xl font-semibold text-[#a8613b] mb-4">
                Bahan-Bahan
              </h2>
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
                    className=" text-white px-4 py-2 rounded-lg transition duration-300"
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
              <h2 className="text-xl font-semibold text-[#a8613b] mb-4">
                Langkah-Langkah
              </h2>
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
                    className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-white hover:text-red-500 transition duration-300"
                  >
                    Hapus Langkah
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
          </>
        )}

        <button
          type="submit"
          className="bg-[#a8613b] text-white px-6 py-3 rounded-lg w-full hover:bg-[#8c4c2f] transition duration-300"
        >
          Simpan Resep
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;