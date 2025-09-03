'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr('');
    setSuccessMsg('');
    
    try {
      await axios.post(
        'http://localhost:5000/api/auth/register',
        { name, email, password },
        { withCredentials: true }
      );
      
      // Show success message and redirect to login after delay
      setSuccessMsg('Registration successful! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (error) {
      console.error('Registration error:', error);
      setErr(
        error.response?.data?.msg || 
        error.response?.data?.message || 
        'Registration failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center "
      style={{ backgroundImage: `url('/slider1_1.jpg')` }}
    >
      <div className="bg-white/30 bg-opacity-60 p-10 rounded-2xl w-full max-w-md shadow-lg backdrop-blur-lg ">
        <h2 className="text-3xl font-bold text-center text-white mb-6">🆕 Register</h2>

        {err && <p className="text-red-400 text-sm mb-4 text-center">{err}</p>}
        {successMsg && <p className="text-green-400 text-sm mb-4 text-center">{successMsg}</p>}

        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-3 rounded-md bg-white/80 text-black placeholder-gray-700 focus:outline-none focus:ring focus:ring-yellow-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-md bg-white/80 text-black placeholder-gray-700 focus:outline-none focus:ring focus:ring-yellow-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md bg-white/80 text-black placeholder-gray-700 focus:outline-none focus:ring focus:ring-yellow-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-3 rounded-md hover:bg-yellow-500 transition disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="text-white text-sm mt-5 text-center">
          Already have an account?{' '}
          <a href="/login" className="underline hover:text-yellow-400">Login here</a>
        </p>
      </div>
    </div>
  );
}