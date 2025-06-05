import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookingForm from '../components/BookingForm';

const Booking = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/tours/${id}`);
      setTour(response.data);
    } catch (error) {
      console.error('Помилка отримання туру:', error);
      }
    };
    fetchTour();
  }, [id]);

  if (!tour) return <div>Завантаження...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Бронювання: {tour.name}</h1>
      <p>Місце: {tour.destination}</p>
      <p>Дати: {new Date(tour.start_date).toLocaleDateString('uk-UA')} - {new Date(tour.end_date).toLocaleDateString('uk-UA')}</p>
      <p>Ціна: {tour.price} грн</p>
      <BookingForm tourId={id} />
    </div>
  );
};

export default Booking;
