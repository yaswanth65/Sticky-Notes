import React, { useState } from 'react';
import { User, Key, Mail } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface AuthFormProps {
  isLogin: boolean;
  onSubmit: (data: { email: string; password: string; name?: string }) => void;
  loading: boolean;
  error: string | null;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin, onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
            <path d="M15.5 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z" />
            <path d="M15 3v6h6" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {isLogin ? 'Welcome Back!' : 'Create an Account'}
        </h2>
        <p className="text-gray-600 mt-1">
          {isLogin
            ? 'Sign in to access your sticky notes'
            : 'Sign up to start creating sticky notes'}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <Input
            label="Name"
            name="name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            leftIcon={<User size={18} />}
          />
        )}

        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          required
          leftIcon={<Mail size={18} />}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
          leftIcon={<Key size={18} />}
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={loading}
          className="mt-6"
        >
          {isLogin ? 'Sign In' : 'Create Account'}
        </Button>
      </form>
    </div>
  );
};

export default AuthForm;