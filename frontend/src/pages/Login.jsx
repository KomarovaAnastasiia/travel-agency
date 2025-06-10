// src/pages/Login.jsx
import React from 'react';
import LoginForm from '../components/LoginForm';

const Login = () => {
  const benefits = [
    "🔐 Безпечний доступ до особистого кабінету",
    "💾 Збереження історії бронювань",
    "⚡ Швидке оформлення нових турів",
    "🔔 Персональні пропозиції та знижки"
  ];

  return (
    <div className="flex items-center justify-center p-20 gradient-bg rounded-[50px] md:rounded-[50px] overflow-hidden shadow-xl">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
        <div className="glass-card p-8 rounded-2xl slide-up">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Вхід</h1>
          <LoginForm />
        </div>
        
        <div className="glass-card p-8 rounded-2xl flex flex-col justify-center slide-up">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Переваги входу</h2>
          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="text-white/90 text-xl mt-1">•</span>
                <span className="text-white/90">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;