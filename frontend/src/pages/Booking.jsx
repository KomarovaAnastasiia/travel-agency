import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookingForm from '../components/BookingForm';

const Booking = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/tours/${id}`);
        setTour(response.data);
      } catch (error) {
        console.error('Помилка отримання туру:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTour();
  }, [id]);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p>Завантаження даних туру...</p>
      </div>
    </div>
  );

  if (!tour) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-card p-8 rounded-2xl text-center">
        <h2 className="text-2xl font-bold mb-4">Тур не знайдено</h2>
        <p className="mb-4">На жаль, ми не змогли знайти інформацію про цей тур</p>
        <a href="/search" className="btn-primary inline-block px-6 py-3">
          Повернутися до пошуку
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <section className="section gradient-bg text-white rounded-[50px] md:rounded-[50px] overflow-hidden shadow-xl">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2">Бронювання туру</h1>
          <p className="text-xl">Заповніть форму нижче, щоб забронювати ваш тур</p>
        </div>
      </section>

      <section className="section">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">{tour.name}</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="text-purple-600 mr-3 mt-1">📍</div>
                <div>
                  <h3 className="font-semibold">Місце призначення</h3>
                  <p>{tour.destination}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-purple-600 mr-3 mt-1">📅</div>
                <div>
                  <h3 className="font-semibold">Дата подорожі</h3>
                  <p>
                    {new Date(tour.start_date).toLocaleDateString('uk-UA')} - {' '}
                    {new Date(tour.end_date).toLocaleDateString('uk-UA')}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-purple-600 mr-3 mt-1">💰</div>
                <div>
                  <h3 className="font-semibold">Ціна за особу</h3>
                  <p className="text-2xl font-bold gradient-text">{tour.price} грн</p>
                </div>
              </div>
              {tour.description && (
                <div className="flex items-start">
                  <div className="text-purple-600 mr-3 mt-1">📝</div>
                  <div>
                    <h3 className="font-semibold">Опис туру</h3>
                    <p className="text-gray-600">{tour.description}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Форма бронювання</h2>
            <p className="text-gray-600 mb-6">
              Заповніть необхідні дані для бронювання. Наш менеджер зв'яжеться з вами для підтвердження.
            </p>
            <BookingForm tourId={id} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;