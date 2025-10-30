'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, checkAuth } from '@/src/features/auth/authSlice';
import axios from 'axios';

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Redux state se data (optional: agar tu future me loading/error track kare)
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr('');

    try {
      // ✅ Backend se login API call
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password },
        { withCredentials: true }
      );

      // ✅ Redux state update karega (authSlice ka action)
      dispatch(loginSuccess(res.data));

      // ✅ Verify auth (Redux thunk)
      await dispatch(checkAuth());

      // ✅ Redirect after login
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Login error:', error);
      setErr(
        error.response?.data?.msg ||
        error.response?.data?.message ||
        'Login failed'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('/hero.png')` }}
    >
      <div className="bg-white/30 backdrop-blur-lg bg-opacity-60 p-10 rounded-2xl w-full max-w-md shadow-lg">
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
          New here?{' '}
          <a href="/register" className="underline hover:text-yellow-400">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}
