import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Beverage = ({ searchTerm }) => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const category = "beverage";

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (storedUser) {
      setUser(storedUser);
    }

    if (!token) {
      setError("Anda belum login. Silakan login terlebih dahulu.");
      setLoading(false);
      return;
    }

    fetch(`http://127.0.0.1:8000/api/recipes?page=${currentPage}&category=${category}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data resep.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        console.log("Recipes Data:", data.data);

        const filteredData = data.data?.filter(recipe => Number(recipe.category) === 4) || [];
        console.log("Filtered Recipes:", filteredData);

        setRecipes(filteredData);
        const perPage = data.meta?.per_page || 5;
        const newTotalPages = Math.ceil(filteredData.length / data.meta?.per_page) || 1;
        setTotalPages(newTotalPages);
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal memuat data resep.");
        setLoading(false);
      });
  }, [currentPage]);

  const filteredRecipes = searchTerm
    ? recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : recipes;

  return (
    <div className="container mx-auto p-4 pt-40 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#a8613b]">Recipe List - Lunch</h1>
        
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {loading && <p className="text-gray-600">Loading...</p>}

      {!loading && filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-[#a8613b]">
                  {recipe.title}
                </h2>
                <p className="text-gray-600 mt-2">
                  {recipe.description.substring(0, 100)}...
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Dibuat oleh: {" "}
                  <span className="font-medium text-[#a8613b]">
                    {recipe.chef}
                  </span>
                </p>
                <Link
                  to={`/recipe/${recipe.id}`}
                  className="mt-4 inline-block bg-[#a8613b] text-white px-4 py-2 rounded-lg hover:bg-[#8c4c2f] transition duration-300"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-gray-600">Tidak ada resep tersedia.</p>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 border rounded-lg ${
                currentPage === index + 1
                  ? "bg-[#a8613b] text-white"
                  : "bg-white text-[#a8613b] border-[#a8613b] hover:bg-[#a8613b] hover:text-white"
              } transition duration-300`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Beverage;
