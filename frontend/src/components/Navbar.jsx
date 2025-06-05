import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

const Navbar = () => {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">ТурАгенція</Link>
        <div className="space-x-4">
          <Link to="/">Головна</Link>
          <Link to="/search">Пошук</Link>
          <Link to="/contact">Контакти</Link>
          {user ? (
            <>
              <Link to="/profile">Профіль</Link>
              {user.role === 'admin' && <Link to="/admin/tours">Адмін</Link>}
              <button onClick={handleLogout} className="hover:underline">Вийти</button>
            </>
          ) : (
            <>
              <Link to="/login">Увійти</Link>
              <Link to="/register">Реєстрація</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
