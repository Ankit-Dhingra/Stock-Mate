import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ setSymbol, fetchStockData }) => {
  return (
    <div className="bg-blue-800 p-4 rounded-lg shadow-lg flex items-center">
      <input
        type="text"
        placeholder="Enter stock symbol..."
        className="bg-blue-700 text-white p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setSymbol(e.target.value)}
      />
      <button
        onClick={fetchStockData}
        className="p-2 ml-2 rounded-full hover:bg-blue-500 transition duration-300"
      >
        <FaSearch className="text-white text-xl rounded-full" />
      </button>
    </div>
  );
};

export default SearchBar;
