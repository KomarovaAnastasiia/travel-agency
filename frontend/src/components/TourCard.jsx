import React from 'react';
import { Link } from 'react-router-dom';

const TourCard = ({ tour }) => {
  return (
    <div className="tour-card hover:shadow-lg transition-all duration-300">
      <div className="overflow-hidden rounded-t-xl">
        <img
          src={tour.images[0] || '/assets/placeholder.jpg'}
          alt={tour.name}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{tour.name}</h3>
        <p className="text-gray-600 mb-3">{tour.destination}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold gradient-text">
            {tour.price} грн
          </span>
          <Link
            to={`/booking/${tour._id}`}
            className="btn-primary px-4 py-2 rounded-lg hover:scale-105 transition-transform"
          >
            Забронювати
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
