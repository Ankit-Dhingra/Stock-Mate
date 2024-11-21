import React from 'react';

const Price = ({ currentPrice, symbol, history }) => {
  return (
    <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-6 rounded-lg shadow-xl mb-6 text-white">
      {/* Current Price */}
      <h3 className="text-2xl font-semibold mb-4 text-center">Current Price for {symbol.toUpperCase()}</h3>
      {currentPrice ? (
        <p className="text-3xl font-bold text-green-400 text-center">${currentPrice}</p>
      ) : (
        <p className="text-lg text-gray-300 text-center">Please search for a stock symbol.</p>
      )}

      {/* Price History */}
      <h3 className="text-xl font-semibold mt-6 mb-4 text-center w-full max-w-xs mx-auto">Price History</h3>
      {history.length > 0 ? (
        <ul className="space-y-4">
          {history.map((entry) => (
            <li key={entry._id} className="flex justify-center items-center py-3 px-4 bg-blue-700 rounded-md shadow-sm hover:bg-blue-600 transition-colors duration-300">
              {/* Date Box */}
              <span className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md mr-4">
                {new Date(entry.date).toLocaleDateString('en-GB')}
              </span>
              <span className="text-gray-300 text-lg">${entry.price}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-300 text-center">No history available. Search for a stock to see its history.</p>
      )}
    </div>
  );
};

export default Price;
