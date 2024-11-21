import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Price from './components/Price';
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [symbol, setSymbol] = useState('');
  const [currentPrice, setCurrentPrice] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  const fetchStockData = async () => {
    if (!symbol) {
      toast.error('Please enter a stock symbol!');
      return;
    }

    try {
      // Fetch current price for the symbol
      const currentResponse = await fetch(`http://localhost:8080/api/stocks/${symbol}`);
      const currentData = await currentResponse.json();
      if (currentData.message) {
        toast.error(currentData.message);
        return;
      }
      setCurrentPrice(currentData.price);

      // Fetch stock history for the symbol
      const historyResponse = await fetch(`http://localhost:8080/api/stocks/history/${symbol}`);
      const historyData = await historyResponse.json();
      setHistory(historyData);
    } catch (err) {
      toast.error('Error fetching stock data. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-900 to-blue-700 text-gray-100">
      <ToastContainer />
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h2 className="text-4xl font-semibold text-center text-white mb-6">Search Your Stock</h2>
        
        <div className="max-w-2xl mx-auto">
          <SearchBar setSymbol={setSymbol} fetchStockData={fetchStockData} />
        </div>
  
        <div className="mt-8">
          <Price currentPrice={currentPrice} symbol={symbol} history={history} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
  
};

export default App;

