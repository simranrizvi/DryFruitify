'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

export default function LoginPage() {
  const { login, checkAuth, } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr('');
    
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password },
        { withCredentials: true }
      );
      
      // Update auth context
      login(res.data);
      
      // Verify the login was successful
      await checkAuth();
      
      // Redirect to home page
      router.push('/');
      router.refresh(); // Ensure the page updates
    } catch (error) {
      setErr(error.response?.data?.msg || error.response?.data?.message || 'Login failed');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url('/slider1_1.jpg')` }}>
      <div className="bg-white/30 backdrop-blur-lg   bg-opacity-60 p-10 rounded-2xl w-full max-w-md shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white mb-6">🔐 Login</h2>

        {err && <p className="text-red-400 text-sm mb-4 text-center">{err}</p>}

        <form onSubmit={handleLogin} className="space-y-5">
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
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-white text-sm mt-5 text-center">
          New here? <a href="/register" className="underline hover:text-yellow-400">Create an account</a>
        </p>
      </div>
    </div>
  );
}