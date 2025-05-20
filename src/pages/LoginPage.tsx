import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/auth/AuthForm';

const LoginPage: React.FC = () => {
  const { user, login, loading, error } = useAuth();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      await login(data.email, data.password);
    } catch (err) {
      // Error is handled in the AuthContext
      console.error('Login failed:', err);
    }
  };

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 bg-gradient-to-br from-amber-50 to-amber-100">
      <AuthForm
        isLogin={true}
        onSubmit={handleLogin}
        loading={loading}
        error={error}
      />
      
      <p className="mt-6 text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-amber-600 hover:text-amber-700 font-medium">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;