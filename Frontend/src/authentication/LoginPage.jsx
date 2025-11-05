import React from 'react';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-8">Login to your account</h1>
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
