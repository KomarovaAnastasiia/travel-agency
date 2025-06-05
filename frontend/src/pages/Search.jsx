import React from 'react';
import SearchForm from '../components/SearchForm';
import TourCard from '../components/TourCard';
import useStore from '../store/useStore';

const Search = () => {
  const tours = useStore((state) => state.tours);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Пошук турів</h1>
      <SearchForm />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tours.length > 0 ? (
          tours.map((tour) => (
            <TourCard key={tour._id} tour={tour} />
          ))
        ) : (
          <p>Тури не знайдено</p>
        )}
      </div>
    </div>
  );
};

export default Search;
