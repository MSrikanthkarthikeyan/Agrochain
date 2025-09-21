import React from "react";
import Navbar from "./Navbar.jsx";
import ConsumerLedger from "./ConsumerLedger.jsx";

const ConsumerApp = () => (
  <div className="min-h-screen bg-gray-100">
    <Navbar />
    <header className="bg-green-600 text-white py-6 text-center shadow-md">
      <h1 className="text-3xl font-bold mb-1">🌱 Consumer Portal</h1>
      <p className="text-green-100">Verify and trace farm produce directly from blockchain</p>
    </header>
    <main className="max-w-5xl mx-auto mt-6 p-6">
      <ConsumerLedger />
    </main>
  </div>
);

export default ConsumerApp;
