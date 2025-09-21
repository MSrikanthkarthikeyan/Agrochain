import React from "react";
import { Routes, Route } from "react-router-dom";
import FarmerApp from "./FarmerApp.jsx";
import ConsumerApp from "./ConsumerApp.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FarmerApp />} />
      <Route path="/consumer" element={<ConsumerApp />} />
      <Route path="*" element={<p className="text-center mt-10 text-red-500">Page not found</p>} />
    </Routes>
  );
}
