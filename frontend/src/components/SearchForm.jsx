import React, { useState } from 'react';
import axios from 'axios';
import useStore from '../store/useStore';

const SearchForm = () => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [price, setPrice] = useState('');
  const setTours = useStore((state) => state.setTours);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/tours`, {
        params: { destination, start_date: startDate, price }
      });
      setTours(response.data);
    } catch (error) {
      console.error('Помилка пошуку:', error);
      alert('Не вдалося виконати пошук');
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-4">
      <input
        type="text"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Місце призначення"
        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Максимальна ціна (грн)"
        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Пошук
      </button>
    </form>
  );
};

export default SearchForm;
