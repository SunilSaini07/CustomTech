import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (localStorage.getItem('isAuthenticated') === 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@gmail.com' && password === 'Admin@123') {
      localStorage.setItem('isAuthenticated', 'true');
      toast.success('Login Successful!');
      navigate('/admin');
    } else {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" style={{ backgroundImage: 'linear-gradient(to top right, #e0f2fe, #dbeafe, #ede9fe)' }}>
      <div className="bg-white/60 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/50">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Admin Panel</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email Address
            </label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="shadow-inner appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400" placeholder="admin@gmail.com" required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="shadow-inner appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400" placeholder="••••••••••" required />
          </div>
          <div className="flex items-center justify-center">
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;