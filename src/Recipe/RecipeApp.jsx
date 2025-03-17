import { useState } from "react";

const categories = [
  { name: "Breakfast", id: "breakfast" },
  { name: "Lunch", id: "lunch" },
  { name: "Dinner", id: "dinner" },
  {name: "Beverage", id: "beverage"},
  {name: "Dessert", id: "dessert"},
  {name: "Snack", id: "snack"},
];

export default function RecipeApp() {
  const [selectedCategory, setSelectedCategory] = useState("breakfast");

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Recipe Categories</h1>
      <div className="flex gap-4 justify-center mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === category.id
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3 text-center">
          {categories.find((c) => c.id === selectedCategory)?.name} Recipes
        </h2>
        <div className="grid gap-4">
          {recipes[selectedCategory].map((recipe, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-md">
              <h3 className="text-lg font-medium">{recipe.title}</h3>
              <p className="text-gray-600">{recipe.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
