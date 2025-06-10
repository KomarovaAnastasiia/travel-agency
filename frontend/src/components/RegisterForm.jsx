import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, {
        name,
        email,
        password
      });
      alert('Реєстрація успішна! Тепер ви можете увійти.');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Помилка реєстрації. Можливо, email вже використовується.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-2 text-white/90">Ім’я:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ваше ім’я"
          required
          className="form-input w-full bg-white/10 border-white/20 text-white placeholder-white/50"
        />
      </div>
      <div>
        <label className="block mb-2 text-white/90">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ваш email"
          required
          className="form-input w-full bg-white/10 border-white/20 text-white placeholder-white/50"
        />
      </div>
      <div>
        <label className="block mb-2 text-white/90">Пароль:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          required
          className="form-input w-full bg-white/10 border-white/20 text-white placeholder-white/50"
        />
      </div>
      <button 
        type="submit" 
        className="btn-primary w-full py-3 flex justify-center items-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : null}
        Зареєструватися
      </button>
      <div className="text-center text-white/80 mt-4">
        Вже зареєстровані?{' '}
        <a href="/login" className="text-amber-200 hover:underline">
          Увійти
        </a>
      </div>
    </form>
  );
};

export default RegisterForm;