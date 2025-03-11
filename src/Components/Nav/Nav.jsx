import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import navCSS from "./Nav.module.css";

const Nav = ({ setShowLogin }) => {
    const menu = useRef();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loadingSearch, setLoadingSearch] = useState(false);

    const MenuHandler = () => {
        menu.current.classList.toggle(navCSS.activeMenu);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await fetch("http://127.0.0.1:8000/api/me", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();
                console.log("User Data:", data);

                if (response.ok) {
                    setUser(data.user || data);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    const fetchRecipes = async (query) => {
        if (!query) {
            setSearchResults([]);
            return;
        }

        setLoadingSearch(true);

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/recipes?search=${query}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setSearchResults(data.data || []);
        } catch (error) {
            console.error("Error fetching recipes:", error);
            setSearchResults([]);
        } finally {
            setLoadingSearch(false);
        }
    };

    const handleSelectRecipe = (recipe) => {
        setSearchQuery("");
        setSearchResults([]);
        navigate(`/recipe/${recipe.id}`);
    };



    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        fetchRecipes(query);
    };

    return (
        <div className={navCSS.Nav_wrapper}>
            <div className={navCSS.logo}>
                <Link to="/">Foodieland<span>.</span></Link>
            </div>

            <ul ref={menu}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/recipe">Recipes</Link></li>
                <li><Link to="/blogs">Blogs</Link></li>
                <li><Link to="/event">Event</Link></li>
            </ul>

            <div className={navCSS.nav_btns}>
                <div className="relative max-w-md sm:max-w-sm xs:max-w-xs">
                    <input
                        type="text"
                        placeholder="Search recipes ..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="border p-2 rounded-lg w-full"
                    />

                    {searchQuery && (
                        <div className="absolute left-0 mt-1 w-full bg-white border rounded-lg shadow-lg">
                            {loadingSearch ? (
                                <p className="p-2 text-gray-500">Loading...</p>
                            ) : searchResults.length > 0 ? (
                                searchResults.map((recipe) => (
                                    <button
                                        key={recipe.id}
                                        onClick={() => handleSelectRecipe(recipe)}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                                    >
                                        {recipe.title}
                                    </button>
                                ))
                            ) : (
                                <p className="p-2 text-gray-500">No results found</p>
                            )}
                        </div>
                    )}
                </div>

                {user ? (
                    <div className="relative">
                        <div
                            className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <i className="ri-user-fill"></i>
                            <span>{user.name} ({user.role})</span>
                        </div>

                        {dropdownOpen && (
                            <div className="absolute left-0 mt-2 w-full bg-white rounded-lg shadow-lg border">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
                                >
                                    <FaSignOutAlt /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={navCSS.LoginBtn} onClick={() => setShowLogin(true)}>
                        <i className="ri-user-line"></i>
                        <Link to="/login">Login</Link>
                    </div>
                )}

                <i className="ri-menu-line" onClick={MenuHandler} id={navCSS.bars}></i>
            </div>
        </div>
    );
};

export default Nav;
