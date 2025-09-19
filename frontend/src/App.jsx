import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [farmer, setFarmer] = useState("");
  const [crop, setCrop] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [chain, setChain] = useState([]);

  // Fetch blockchain ledger
  const fetchChain = async () => {
    try {
      const res = await axios.get("http://localhost:5000/chain");
      setChain(res.data.chain);
    } catch (err) {
      console.error("Error fetching chain:", err);
    }
  };

  // Add new produce
  const addProduce = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/add", {
        farmer,
        crop,
        quantity,
        location,
      });
      setFarmer("");
      setCrop("");
      setQuantity("");
      setLocation("");
      fetchChain();
    } catch (err) {
      console.error("Error adding block:", err);
    }
  };

  useEffect(() => {
    fetchChain();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        🌱 AgroChain – Blockchain Produce Tracker
      </h1>

      {/* Form */}
      <form
        onSubmit={addProduce}
        className="bg-white shadow-md rounded-xl p-6 w-full max-w-md mb-10"
      >
        <h2 className="text-xl font-semibold mb-4">Add Produce</h2>

        <input
          type="text"
          placeholder="Farmer Name"
          value={farmer}
          onChange={(e) => setFarmer(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Crop"
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded"
        >
          Add to Blockchain
        </button>
      </form>

      {/* Blockchain Ledger */}
      <h2 className="text-2xl font-bold mb-4">📜 Blockchain Ledger</h2>
      <div className="w-full max-w-3xl">
        {chain.length === 0 ? (
          <p className="text-gray-600">No produce records yet.</p>
        ) : (
          chain.map((block, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-xl p-4 mb-4 border-l-4 border-green-500"
            >
              <p>
                <strong>Block:</strong> {block.index}
              </p>
              <p>
                <strong>Farmer:</strong>{" "}
                {block.data?.farmer || "N/A"}
              </p>
              <p>
                <strong>Crop:</strong> {block.data?.crop || "N/A"}
              </p>
              <p>
                <strong>Quantity:</strong>{" "}
                {block.data?.quantity || "N/A"}
              </p>
              <p>
                <strong>Location:</strong>{" "}
                {block.data?.location || "N/A"}
              </p>
              <p className="text-xs text-gray-500 break-all">
                <strong>Hash:</strong> {block.hash}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
