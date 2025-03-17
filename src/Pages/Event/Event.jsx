import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }

    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Token is missing");
        }

        const response = await fetch("http://127.0.0.1:8000/api/cooking-events", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error("Gagal mengambil data event");
        }

        const data = await response.json();
        console.log("Fetched Events Data:", data);

        setEvents(data.data || []);
      } catch (err) {
        console.error("Error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div className="text-center mt-20 text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-20 text-lg font-semibold">{error}</div>;

  return (
    <div className="container mx-auto p-6 mt-40 max-w-6xl bg-gradient-to-br from-[#f9f9f9] to-[#f0e6e1] rounded-xl shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-[#a8613b]">Ongoing Events</h2>
        {user && (user.role === "chef" || user.role === "admin") && (
          <Link
            to="/event/create"
            className="bg-[#a8613b] text-white px-6 py-2 rounded-lg hover:bg-[#8c4c2f] transition duration-300"
          >
            + Tambah Event
          </Link>
        )}
      </div>

      <p className="text-gray-600 text-lg mb-8">
        Join our exciting events and discover new culinary experiences!
      </p>

      {userRole === "chef" && (
        <Link
          to="/create-event"
          className="bg-[#a8613b] text-white px-6 py-2 rounded-lg mb-8 inline-block hover:bg-[#8c4c2f] transition duration-300"
        >
          + Create Event
        </Link>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length === 0 ? (
          <div className="text-gray-500 text-center">No events available</div>
        ) : (
          events.map((event) => (
            <Link
              to={`/event/${event.id}`}
              key={event.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={event.image || "https://via.placeholder.com/800x400"}
                alt={event.title || "Event Image"}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#a8613b] mb-2">
                  {event.title || "Untitled Event"}
                </h3>
                <div className="text-gray-600">
                  <p className="mb-2">By: {event.chef || "Unknown Chef"}</p>
                  <p>{event.date || "Date not available"}</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Event;