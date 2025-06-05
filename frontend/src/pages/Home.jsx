import React from 'react';
import SearchForm from '../components/SearchForm';

const Home = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Ласкаво просимо до ТурАгенції!</h1>
      <p className="mb-4">Знайдіть ідеальний тур для вашої відпустки в Україні.</p>
      <SearchForm />
      <h2 className="text-xl font-semibold mt-4 mb-2">Популярні тури</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border p-4 rounded-lg">Тур: Карпати – 3500 грн</div>
        <div className="border p-4 rounded-lg">Тур: Одеса – 4500 грн</div>
        <div className="border p-4 rounded-lg">Тур: Львів – 3000 грн</div>
      </div>
    </div>
  );
};

export default Home;
