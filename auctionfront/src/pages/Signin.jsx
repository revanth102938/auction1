import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../context/UserContext.jsx";
import AxiosInstance from "../utils/ApiConfig.js";

export default function SignIn() {
  const { fetchUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosInstance.post("/users/login", formData);
      await fetchUser();
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setErrorMessage("Incorrect email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-white flex flex-col justify-center items-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-yellow-700">
          Sign In to AuctionIt
        </h2>

        {errorMessage && (
          <div className="text-red-600 text-sm text-center mb-4">{errorMessage}</div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="example@mail.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-white py-2 rounded-lg"
          >
            Sign In
          </button>
        </form>
      </div>

      <p className="mt-4 text-sm text-gray-600">
        New to AuctionIt?{" "}
        <Link to="/SignUp" className="text-yellow-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
