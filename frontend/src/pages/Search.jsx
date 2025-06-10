import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import TourCard from '../components/TourCard';
import useStore from '../store/useStore';

const Search = () => {
  const tours = useStore((state) => state.tours);
  const location = useLocation();
  const [initialDestination, setInitialDestination] = useState('');

  useEffect(() => {
    if (location.state?.destination) {
      setInitialDestination(location.state.destination);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen">
      <section className="section gradient-bg text-white rounded-[50px] md:rounded-[50px] overflow-hidden shadow-xl">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">Пошук турів</h1>
          <div className="glass-card p-6 rounded-2xl fade-in">
            <SearchForm initialDestination={initialDestination} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center gradient-text">
            Знайдені тури
          </h2>
          {tours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 slide-up">
              {tours.map((tour) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Тури не знайдено. Спробуйте змінити параметри пошуку.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Search;