import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/auth/AuthForm';

const RegisterPage: React.FC = () => {
  const { user, register, loading, error } = useAuth();

  const handleRegister = async (data: { email: string; password: string; name?: string }) => {
    if (!data.name) return;
    
    try {
      await register(data.email, data.password, data.name);
    } catch (err) {
      // Error is handled in the AuthContext
      console.error('Registration failed:', err);
    }
  };

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 bg-gradient-to-br from-amber-50 to-amber-100">
      <AuthForm
        isLogin={false}
        onSubmit={handleRegister}
        loading={loading}
        error={error}
      />
      
      <p className="mt-6 text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-amber-600 hover:text-amber-700 font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;