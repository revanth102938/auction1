// src/components/Header.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext.jsx";
import AxiosInstance from "../utils/ApiConfig.js";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await AxiosInstance.post("/users/logout");
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="bg-blue-800 px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold text-white">AuctionIt</Link>
      <nav className="flex space-x-6 items-center">
        <Link to="/auctions" className="text-white font-medium hover:underline">Auctions</Link>
        {user?.role === "admin" && (
          <Link to="/admin/auctions" className="text-white font-medium hover:underline">Manage</Link>
        )}
        {user ? (
          <>
            <span className="text-white">{user.username}</span>
            <button onClick={handleLogout} className="bg-white text-yellow-600 px-4 py-1 rounded hover:bg-gray-100">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/SignIn" className="text-white hover:underline">Sign In</Link>
            <Link to="/SignUp" className="text-white hover:underline">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
