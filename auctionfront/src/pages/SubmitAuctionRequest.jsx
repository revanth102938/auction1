import React, { useState, useContext } from "react";
import AxiosInstance from "../utils/ApiConfig.js";
import UserContext from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

const SubmitAuctionRequest = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    baseprice: "",
    image: null,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return setError("You must be logged in to submit a request");

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("baseprice", formData.baseprice);
    payload.append("image", formData.image);
    payload.append("requestedby", user._id);
    payload.append("status", "pending");

    try {
      setLoading(true);
      await AxiosInstance.post("/auctionrequests/submit-request", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to submit auction request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-yellow-600 mb-6">
          Submit Auction Request
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Item Name"
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Item Description"
            required
            className="w-full border border-gray-300 rounded-md p-2 h-28 resize-none"
          />

          <input
            type="number"
            name="baseprice"
            value={formData.baseprice}
            onChange={handleChange}
            placeholder="Base Price (₹)"
            required
            className="w-full border border-gray-300 rounded-md p-2"
          />

          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            required
            className="w-full"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-400"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitAuctionRequest;
