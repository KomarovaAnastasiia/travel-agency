import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useStore from '../store/useStore';

const Profile = () => {
  const user = useStore((state) => state.user);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/bookings/user/${user.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Помилка отримання бронювань:', error);
      }
    };
    if (user) fetchBookings();
  }, [user]);

  if (!user) return <div className="text-center">Будь ласка, увійдіть до системи</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Профіль: {user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Роль: {user.role === 'admin' ? 'Адміністратор' : 'Користувач'}</p>
      <h2 className="text-xl font-semibold mt-4 mb-2">Історія бронювань</h2>
      {bookings.length > 0 ? (
        <ul className="space-y-2">
          {bookings.map((booking) => (
            <li key={booking._id} className="border p-2 rounded-lg">
              Тур: {booking.tour_id.name}, Дата: {new Date(booking.booking_date).toLocaleDateString('uk-UA')}, Статус: {booking.status === 'confirmed' ? 'Підтверджено' : 'Скасовано'}
            </li>
          ))}
        </ul>
      ) : (
        <p>Бронювань немає</p>
      )}
    </div>
  );
};

export default Profile;
