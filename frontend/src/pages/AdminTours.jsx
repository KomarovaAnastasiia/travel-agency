import React, { useState } from 'react';
import axios from 'axios';
import useStore from '../store/useStore';

const AdminTours = () => {
  const user = useStore((state) => state.user);
  const [tourData, setTourData] = useState({
    name: '',
    destination: '',
    start_date: '',
    end_date: '',
    price: '',
    description: '',
    images: []
  });

  if (!user || user.role !== 'admin') return <div className="text-center">Доступ заборонено</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/tours`, tourData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Тур додано!');
      setTourData({ name: '', destination: '', start_date: '', end_date: '', price: '', description: '', images: [] });
    } catch (error) {
      console.error('Помилка додавання туру:', error);
      alert('Помилка додавання туру');
    }
  };

  const handleChange = (e) => {
    setTourData({ ...tourData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Керування турами</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1">Назва:</label>
          <input
            type="text"
            name="name"
            value={tourData.name}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1">Місце призначення:</label>
          <input
            type="text"
            name="destination"
            value={tourData.destination}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1">Дата початку:</label>
          <input
            type="date"
            name="start_date"
            value={tourData.start_date}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1">Дата закінчення:</label>
          <input
            type="date"
            name="end_date"
            value={tourData.end_date}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1">Ціна (грн):</label>
          <input
            type="number"
            name="price"
            value={tourData.price}
            onChange={handleChange}
            required
            className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1">Опис:</label>
          <textarea
            name="description"
            value={tourData.description}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Додати тур
        </button>
      </form>
    </div>
  );
};

export default AdminTours;
