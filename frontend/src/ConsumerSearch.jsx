import React from "react";

const ConsumerSearch = ({ search, setSearch }) => {
  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="🔍 Search by crop, farmer, or location..."
        className="border rounded-lg px-4 py-2 w-1/2 shadow focus:outline-none focus:ring-2 focus:ring-green-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default ConsumerSearch;
