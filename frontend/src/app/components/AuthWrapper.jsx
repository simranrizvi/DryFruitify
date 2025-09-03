// app/components/AuthWrapper.jsx
'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const AuthWrapper = ({ children }) => {
  const { isLoggedIn, authCheckCompleted } = useAuth();
  const router = useRouter();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (authCheckCompleted && !isLoggedIn) {
      setShouldRedirect(true);
    }
  }, [authCheckCompleted, isLoggedIn]);

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/login');
    }
  }, [shouldRedirect, router]);

  if (!authCheckCompleted) {
    return <LoadingSpinner />;
  }

  if (!isLoggedIn) {
    return null; // The useEffect will handle the redirect
  }

  return <>{children}</>;
};

export default AuthWrapper;