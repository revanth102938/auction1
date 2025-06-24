import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext.jsx";
import AxiosInstance from "../utils/ApiConfig.js";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
} from "react-icons/ai";

const Home = () => {
  const navigate = useNavigate();
  const { user, setUser, fetchUser } = useContext(UserContext);

  useEffect(() => {
    if (!user) fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await AxiosInstance.post("/users/logout", {});
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <React.Fragment>
      <div className="w-full h-screen relative">
        <img
          src="/pexels-sora-shimazaki-5668473.jpg"
          alt="auction background"
          className="w-full h-full object-cover"
        />
      </div>

      <nav className="w-full absolute top-0 p-5 flex justify-between text-white z-10 items-center">
        <h1
          onClick={() => navigate("/")}
          className="text-3xl font-bold cursor-pointer"
        >
          AuctionIt
        </h1>

        <ul className="flex space-x-5 font-bold cursor-pointer">
          {user?.role === "admin" ? (
            <>
              <li onClick={() => navigate("/admin/dashboard")} className="hover:underline">
                Admin Dashboard
              </li>
              <li onClick={() => navigate("/admin/auctions")} className="hover:underline">
                Manage Auctions
              </li>
              <li onClick={() => navigate("/admin/users")} className="hover:underline">
                Manage Users
              </li>
            </>
          ) : (
            <>
              <li onClick={() => navigate("/active-auctions")} className="hover:underline">
                Explore Auctions
              </li>
              <li onClick={() => navigate("/submit-request")} className="hover:underline">
                Auction request
              </li>
            </>
          )}
        </ul>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-white">Hi, {user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/SignIn")}
                className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/SignUp")}
                className="text-white border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      <div className="absolute top-0 h-screen flex flex-col space-y-10 justify-center items-center bg-opacity-100 xl:w-1/3 sm:w-1/2 z-0">
        <div className="text-center space-y-5 px-5">
          <h2 className="text-2xl font-bold tracking-widest">WELCOME TO</h2>
          <h1 className="text-5xl font-extrabold text-white">AuctionIt</h1>
          <p className="text-gray-300 text-sm">
            Discover exclusive auctions. Place your bids. Win amazing deals.
          </p>
        </div>

        <button
          onClick={() => navigate("/active-auctions")}
          className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-lg"
        >
          View Live Auctions
        </button>

        <div className="text-white flex space-x-5">
          <AiFillFacebook size={"2rem"} className="cursor-pointer" />
          <AiFillInstagram size={"2rem"} className="cursor-pointer" />
          <AiFillTwitterSquare size={"2rem"} className="cursor-pointer" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
