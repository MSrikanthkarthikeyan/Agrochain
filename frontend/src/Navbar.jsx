import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const linkClasses = (path) =>
    `px-4 py-2 rounded-md font-medium transition-colors ${
      location.pathname === path
        ? "bg-green-800 text-white shadow-lg"
        : "text-white hover:bg-green-600 hover:text-white"
    }`;

  return (
    <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">🌱 AgroChain</h1>
      <div className="flex gap-4">
        <Link to="/" className={linkClasses("/")}>👨‍🌾 Farmer Portal</Link>
        <Link to="/consumer" className={linkClasses("/consumer")}>🛒 Consumer Portal</Link>
      </div>
    </nav>
  );
};

export default Navbar;
