import React from 'react';
import { Link } from 'react-router-dom';

const TourCard = ({ tour }) => {
  return (
    <div className="border rounded-lg shadow-md p-4">
      <img
        src={tour.images[0] || '/assets/placeholder.jpg'}
        alt={tour.name}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h3 className="text-lg font-semibold mt-2">{tour.name}</h3>
      <p className="text-gray-600">{tour.destination}</p>
      <p className="text-blue-600 font-medium">{tour.price} грн</p>
      <Link
        to={`/booking/${tour._id}`}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg inline-block hover:bg-blue-600"
      >
        Забронювати
      </Link>
    </div>
  );
};

export default TourCard;
