import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Nav/Nav";
import Footer from "../Components/Foot/Footer";

const ContentRoutes = () => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="w-full">
            <Navbar setSearchTerm={setSearchTerm} />
            <Outlet context={{ searchTerm }} />
            <Footer />
        </div>
    );
};

export default ContentRoutes;