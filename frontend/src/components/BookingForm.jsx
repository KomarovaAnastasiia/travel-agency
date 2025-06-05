import React, { useState } from 'react';
import axios from 'axios';
import useStore from '../store/useStore';

const BookingForm = ({ tourId }) => {
  const [persons, setPersons] = useState(1);
  const [services, setServices] = useState([]);
  const user = useStore((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert('Будь ласка, увійдіть до системи');
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, {
        tourId,
        userId: user.id,
        bookingDate: new Date(),
        persons,
        services
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Бронювання успішне!');
    } catch (error) {
      console.error('Помилка бронювання:', error);
      alert('Помилка бронювання');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Кількість осіб:</label>
        <input
          type="number"
          value={persons}
          onChange={(e) => setPersons(parseInt(e.target.value))}
          min="1"
          className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block mb-1">Додаткові послуги:</label>
        <select
          multiple
          onChange={(e) => setServices([...e.target.selectedOptions].map(o => o.value))}
          className="border p-2 rounded-lg w-full"
        >
          <option value="transfer">Трансфер</option>
          <option value="guide">Гід</option>
          <option value="insurance">Страхування</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Забронювати
      </button>
    </form>
  );
};

export default BookingForm;
