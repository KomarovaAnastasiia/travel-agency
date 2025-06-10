import React, { useState } from 'react';
import axios from 'axios';
import useStore from '../store/useStore';

const BookingForm = ({ tourId }) => {
  const [persons, setPersons] = useState(1);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useStore((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert('Будь ласка, увійдіть до системи');
    
    setIsLoading(true);
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
      alert('Бронювання успішне! Наш менеджер зв\'яжеться з вами найближчим часом.');
    } catch (error) {
      console.error('Помилка бронювання:', error);
      alert('Помилка бронювання. Будь ласка, спробуйте ще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-2 text-gray-700">Кількість осіб:</label>
        <input
          type="number"
          value={persons}
          onChange={(e) => setPersons(Math.max(1, parseInt(e.target.value) || 1))}
          min="1"
          className="form-input w-full"
        />
      </div>
      <div>
        <label className="block mb-2 text-gray-700">Додаткові послуги:</label>
        <select
          multiple
          onChange={(e) => setServices([...e.target.selectedOptions].map(o => o.value))}
          className="form-input w-full h-auto min-h-[120px]"
        >
          <option value="transfer" className="p-2">🚗 Трансфер (доставка до місця призначення)</option>
          <option value="guide" className="p-2">🗣️ Гід (екскурсійне обслуговування)</option>
          <option value="insurance" className="p-2">🏥 Страхування (медичне страхування на час подорожі)</option>
        </select>
        <p className="text-sm text-gray-500 mt-1">
          Утримуйте Ctrl (Windows) або Command (Mac) для вибору кількох послуг
        </p>
      </div>
      <button 
        type="submit" 
        className="btn-primary w-full py-3 flex justify-center items-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : null}
        Забронювати
      </button>
      <div className="text-center text-gray-500 text-sm">
        Натискаючи кнопку, ви погоджуєтесь з нашими{' '}
        <a href="#" className="text-purple-600 hover:underline">умовами бронювання</a>
      </div>
    </form>
  );
};

export default BookingForm;