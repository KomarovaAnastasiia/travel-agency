import React from 'react';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Вхід</h1>
      <LoginForm />
    </div>
  );
};

export default Login;
