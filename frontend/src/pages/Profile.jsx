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

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-card p-8 rounded-2xl text-center">
        <h2 className="text-2xl font-bold mb-4">Будь ласка, увійдіть до системи</h2>
        <p className="mb-4">Щоб переглянути профіль, вам потрібно увійти</p>
        <a href="/login" className="btn-primary inline-block px-6 py-3">
          Увійти
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <section className="section gradient-bg text-white rounded-[50px] md:rounded-[50px] overflow-hidden shadow-xl">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2">Мій профіль</h1>
          <p className="text-xl">Керуйте своїми бронюваннями та налаштуваннями</p>
        </div>
      </section>

      <section className="section">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 slide-up">
          <div className="glass-card p-6 rounded-2xl col-span-1">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-amber-200 rounded-full flex items-center justify-center mb-4">
                <span className="text-purple-600 font-bold text-3xl">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
              <p className="text-gray-600 mb-2">{user.email}</p>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                {user.role === 'admin' ? 'Адміністратор' : 'Користувач'}
              </span>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl col-span-2 slide-up">
            <h2 className="text-2xl font-bold mb-6">Історія бронювань</h2>
            {bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking._id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div className="mb-3 md:mb-0">
                        <h3 className="text-xl font-semibold">{booking.tour_id.name}</h3>
                        <p className="text-gray-600">{booking.tour_id.destination}</p>
                      </div>
                      <div className="flex flex-col md:items-end">
                        <span className="text-lg font-bold gradient-text mb-1">
                          {booking.tour_id.price} грн
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {booking.status === 'confirmed' ? 'Підтверджено' : 'Скасовано'}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {new Date(booking.booking_date).toLocaleDateString('uk-UA')}
                          </span>
                        </div>
                      </div>
                    </div>
                    {booking.services && booking.services.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <h4 className="text-sm font-medium mb-1">Додаткові послуги:</h4>
                        <div className="flex flex-wrap gap-2">
                          {booking.services.map((service, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                              {service === 'transfer' && 'Трансфер'}
                              {service === 'guide' && 'Гід'}
                              {service === 'insurance' && 'Страхування'}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 mb-4">У вас немає бронювань</p>
                <a href="/search" className="btn-primary inline-block px-6 py-3">
                  Знайти тури
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;