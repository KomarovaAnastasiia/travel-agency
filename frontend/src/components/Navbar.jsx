import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useStore from '../store/useStore';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const NavLink = ({ to, children, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className={`navbar-link relative group ${
        isActiveLink(to) ? 'text-amber-200' : ''
      }`}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-200 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );

  return (
    <nav className="navbar">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-2 group">
            <svg className="w-8 h-8 text-amber-200 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L13.09 8.26L18 7L16.74 12L22 13.09L15.74 14.35L17 19.26L12 18L6.26 19.26L7.35 14.35L2 13.09L7.26 12L6 7L10.91 8.26L12 2Z" />
            </svg>
            <span className="brand-logo group-hover:-translate-y-1">ТурАгенція</span>
          </Link>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Головна</NavLink>
            <NavLink to="/search">Пошук</NavLink>
            <NavLink to="/contact">Контакти</NavLink>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <NavLink to="/profile">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-amber-200 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-semibold text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span>Профіль</span>
                  </div>
                </NavLink>
                
                {user.role === 'admin' && (
                  <NavLink to="/admin/tours">
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span>Адмін</span>
                    </div>
                  </NavLink>
                )}
                
                <button 
                  onClick={handleLogout}
                  className="navbar-link hover:text-red-300 flex items-center space-x-1"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h9z"/>
                  </svg>
                  <span>Вийти</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <NavLink to="/login">Увійти</NavLink>
                <Link to="/register" className="navbar-button">
                  Реєстрація
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-white/20 pt-4">
            <div className="flex flex-col space-y-4">
              <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Головна</NavLink>
              <NavLink to="/search" onClick={() => setIsMenuOpen(false)}>Пошук</NavLink>
              <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>Контакти</NavLink>
              
              {user ? (
                <>
                  <NavLink to="/profile" onClick={() => setIsMenuOpen(false)}>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-semibold text-xs">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span>Профіль</span>
                    </div>
                  </NavLink>
                  
                  {user.role === 'admin' && (
                    <NavLink to="/admin/tours" onClick={() => setIsMenuOpen(false)}>Адмін</NavLink>
                  )}
                  
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="navbar-link text-left hover:text-red-300"
                  >
                    Вийти
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>Увійти</NavLink>
                  <Link 
                    to="/register" 
                    className="navbar-button inline-block text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Реєстрація
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;