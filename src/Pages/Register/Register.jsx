import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({name: `${name}`, email: `${email}`, password: `${password}`, role: `${role}`})    
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        setError("Registrasi gagal, coba lagi dengan email lain.");
      }
    } catch (error) {
      setError("Terjadi kesalahan, coba lagi nanti.");
      console.error("Register Error:", error);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-[#a8613b] to-[#5c2614] px-4">
      <AiOutlineHome
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 text-3xl text-gray-300 hover:text-white cursor-pointer transition-transform transform hover:scale-110"
      />

      <div className="bg-[#3a1e14]/80 backdrop-blur-md text-white shadow-lg rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center mb-2">REGISTER</h2>
        <p className="text-center text-gray-300 mb-6">
          Please enter your details to create an account!
        </p>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-500 bg-transparent rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Full Name"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-500 bg-transparent rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-500 bg-transparent rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Password (min. 6 characters)"
              required
            />
          </div>

          <div className="mb-4">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-gray-500 bg-transparent rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option className="bg-[#3a1e14]/80" value="user">User</option>
              <option className="bg-[#3a1e14]/80" value="chef">Chef</option>
              <option className="bg-[#3a1e14]/80" value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full border border-white text-white font-semibold py-2 rounded-lg hover:bg-white hover:text-gray-900 transition duration-200"
          >
            REGISTER
          </button>
        </form>

        <p className="text-center text-gray-300 mt-4">
          Already have an account?{" "}
          <span
            className="text-white font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
