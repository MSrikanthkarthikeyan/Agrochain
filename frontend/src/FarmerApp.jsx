import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar.jsx";

const FarmerApp = () => {
  const [farmer, setFarmer] = useState("");
  const [crop, setCrop] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [chain, setChain] = useState([]);

  const fetchChain = async () => {
    try {
      const res = await axios.get("http://localhost:5000/chain");
      setChain(res.data.chain.reverse()); // show newest first
    } catch (err) {
      console.error(err);
    }
  };

  const addProduce = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/add", { farmer, crop, quantity, location });
      setFarmer(""); setCrop(""); setQuantity(""); setLocation("");
      fetchChain();
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchChain(); }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <header className="bg-green-600 text-white py-6 text-center shadow-md">
        <h1 className="text-3xl font-bold mb-1">🌱 Farmer Portal</h1>
        <p className="text-green-100">Add farm produce to blockchain ledger</p>
      </header>

      {/* Add Produce Form */}
      <section className="max-w-2xl mx-auto p-6 mt-6 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-green-700">Add Produce</h2>
        <form className="space-y-4" onSubmit={addProduce}>
          <input type="text" placeholder="Farmer Name" value={farmer} onChange={e=>setFarmer(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400" required />
          <input type="text" placeholder="Crop" value={crop} onChange={e=>setCrop(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400" required />
          <input type="number" placeholder="Quantity" value={quantity} onChange={e=>setQuantity(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400" required />
          <input type="text" placeholder="Location" value={location} onChange={e=>setLocation(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-400" required />
          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg shadow-md transition">
            Add to Blockchain
          </button>
        </form>
      </section>

      {/* Blockchain Ledger */}
      <section className="max-w-5xl mx-auto mt-10 p-6">
        <h2 className="text-2xl font-bold text-green-700 mb-4">📜 Blockchain Ledger</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chain.length === 0 ? (
            <p className="text-gray-600">No produce records yet.</p>
          ) : (
            chain.map((block, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-lg border-l-4 border-green-500 hover:scale-105 transition transform">
                <p><strong>Block:</strong> {block.index}</p>
                <p><strong>Farmer:</strong> {block.data?.farmer || "N/A"}</p>
                <p><strong>Crop:</strong> {block.data?.crop || "N/A"}</p>
                <p><strong>Quantity:</strong> {block.data?.quantity || "N/A"}</p>
                <p><strong>Location:</strong> {block.data?.location || "N/A"}</p>
                <p className="text-xs text-gray-500 break-all"><strong>Hash:</strong> {block.hash}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default FarmerApp;
