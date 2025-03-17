import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import searchCSS from "./Search.module.css";

function Search({ searchTerm }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Anda belum login. Silakan login terlebih dahulu.");
      setLoading(false);
      return;
    }

    fetch(`http://127.0.0.1:8000/api/recipes`, {
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
        setRecipes(data.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal memuat data resep.");
        setLoading(false);
      });
  }, []);

  const filteredRecipes = searchTerm
    ? recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : recipes;

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <div className={`${searchCSS.search_wrapper} section`}>
      <h2>Popular Searches</h2>

      {error && <p className="text-red-500">{error}</p>}
      {loading && <p>Loading...</p>}

      <div className={searchCSS.Cards}>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className={searchCSS.card}
              onClick={() => handleRecipeClick(recipe.id)}
            >
              <i className="ri-search-line"></i>
              <h3>
                Try this new recipe
                <span>{recipe.title}</span>
              </h3>
            </div>
          ))
        ) : (
          <p>Tidak ada resep yang ditemukan.</p>
        )}
      </div>
    </div>
  );
}

export default Search;