import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    date: "",
    location: "",
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    if (value) {
      const dateObj = new Date(value);
      const formattedDate = dateObj.toISOString().split("T")[0]; 
      setFormData({ ...formData, date: formattedDate });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const data = new FormData();
    data.append("chef_id", user.id);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("date", formData.date);
    data.append("location", formData.location);
    data.append("image", formData.image);

    const token = localStorage.getItem("token");

    try {
      const eventResponse = await fetch("http://127.0.0.1:8000/api/cooking-events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (!eventResponse.ok) throw new Error("Gagal membuat event");

      const eventData = await eventResponse.json();
      console.log("Event created:", eventData);

      navigate("/event");
    } catch (error) {
      setError("Terjadi kesalahan. Coba lagi nanti.");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f9f9] to-[#f0e6e1] py-12 px-4 t-40 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-[#a8613b] text-center mb-6">Tambah Event</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Judul Event</label>
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
            <label className="block text-sm font-medium text-gray-700">Tanggal & Waktu</label>
            <input
              type="date"
              name="date"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#a8613b]"
              value={formData.date}
              onChange={handleDateChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Lokasi</label>
            <input
              type="text"
              name="location"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#a8613b]"
              value={formData.location}
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
              onChange={handleFileChange}
            />
          </div>

          <button
            type="submit"
            className="bg-[#a8613b] text-white px-6 py-3 rounded-lg w-full hover:bg-[#8c4c2f] transition duration-300 transform hover:scale-105"
          >
            Simpan Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;