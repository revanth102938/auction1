import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext.jsx";
import AxiosInstance from "../utils/ApiConfig.js";

export default function SignUp() {
  const { fetchUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      await AxiosInstance.post("/users/signup", formData);
      await fetchUser();
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setErrorMessage("Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-white flex justify-center items-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-yellow-700">
          Create Your AuctionIt Account
        </h2>

        {errorMessage && (
          <div className="text-red-600 text-sm text-center mb-4">{errorMessage}</div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            type="text"
            placeholder="Enter your username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Create a password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            placeholder="Confirm your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-white py-2 rounded-lg"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
