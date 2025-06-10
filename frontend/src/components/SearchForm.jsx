import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useStore from '../store/useStore';

const SearchForm = ({ initialDestination = '' }) => {
  const [destination, setDestination] = useState(initialDestination);
  const [startDate, setStartDate] = useState('');
  const [price, setPrice] = useState('');
  const setTours = useStore((state) => state.setTours);

  useEffect(() => {
    setDestination(initialDestination);
  }, [initialDestination]);

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
    <form onSubmit={handleSearch} className="space-y-6">
      <div>
        <label className="block mb-2 text-white/90">Місце призначення:</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Введіть місце призначення"
          className="form-input w-full bg-white/10 border-white/20 text-white placeholder-white/50"
        />
      </div>
      <div>
        <label className="block mb-2 text-white/90">Дата початку:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="form-input w-full bg-white/10 border-white/20 text-white placeholder-white/50"
        />
      </div>
      <div>
        <label className="block mb-2 text-white/90">Максимальна ціна (грн):</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Введіть максимальну ціну"
          className="form-input w-full bg-white/10 border-white/20 text-white placeholder-white/50"
        />
      </div>
      <button 
        type="submit" 
        className="btn-primary w-full py-3 flex justify-center items-center"
      >
        🔍 Пошук турів
      </button>
    </form>
  );
};

export default SearchForm;