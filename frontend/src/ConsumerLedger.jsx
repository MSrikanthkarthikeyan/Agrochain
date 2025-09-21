import React, { useEffect, useState } from "react";
import axios from "axios";

const ConsumerLedger = () => {
  const [chain, setChain] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/chain")
      .then(res => setChain(res.data.chain.reverse()))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {chain.length === 0 ? (
        <p className="text-gray-600">No produce records yet.</p>
      ) : (
        chain.map((block,index)=>(
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
  );
};

export default ConsumerLedger;
