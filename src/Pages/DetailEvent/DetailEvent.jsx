import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DetailEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const eventRes = await fetch(`http://127.0.0.1:8000/api/cooking-events/${id}`, { headers });
        if (!eventRes.ok) throw new Error("Gagal mengambil data event");
        const eventData = await eventRes.json();
        setEvent(eventData.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleDeleteEvent = async () => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus event ini?")) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://127.0.0.1:8000/api/cooking-events/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Event berhasil dihapus!");
      navigate("/event");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleUpdateEvent = async () => {
    navigate(`/event/create`, {
      state: { event: event },
    });
  };

  if (loading) return <p className="text-center mt-20 text-lg font-semibold">Loading...</p>;
  if (!event) return <p className="text-center text-red-500 mt-20 text-lg font-semibold">Event tidak ditemukan!</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br pt-40 from-[#f9f9f9] to-[#f0e6e1] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="relative h-96 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white text-center">{event.title}</h1>
          </div>
        </div>

        <div className="p-8">
          <p className="text-gray-700 text-lg mb-6">{event.description}</p>
          <div className="bg-[#a8613b] text-white p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Tanggal:</p>
                <p>{event.date}</p>
              </div>
              <div>
                <p className="font-semibold">Lokasi:</p>
                <p>{event.location}</p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex space-x-4">
            <button
              onClick={handleUpdateEvent}
              className="bg-[#a8613b] text-white px-6 py-2 rounded-lg hover:bg-[#8c4c2f] transition duration-300 transform hover:scale-105"
            >
              Update Event
            </button>
            <button
              onClick={handleDeleteEvent}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300 transform hover:scale-105"
            >
              Delete Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailEvent;