import React, { useState } from 'react';
import { Zap, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { Button, Input, Card } from '../components';
import { createUser, loginUser } from '../services/storage';
import { validateForm } from '../utils/validation';

/**
 * Authentication Page - Login & Signup
 */
function AuthPage({ onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setGeneralError('');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneralError('');

    // Validate form
    const requiredFields = mode === 'signup' 
      ? ['name', 'email', 'password'] 
      : ['email', 'password'];
    
    const validation = validateForm(formData, requiredFields);

    if (!validation.isValid) {
      setErrors(validation.errors);
      setLoading(false);
      return;
    }

    // Perform signup or login
    if (mode === 'signup') {
      const result = createUser(formData);
      
      if (result.success) {
        // Auto-login after successful signup
        onLoginSuccess(result.user);
      } else {
        setGeneralError(result.error);
      }
    } else {
      const result = loginUser(formData.email, formData.password);
      
      if (result.success) {
        onLoginSuccess(result.user);
      } else {
        setGeneralError(result.error);
      }
    }

    setLoading(false);
  };

  // Switch between login and signup
  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setErrors({});
    setGeneralError('');
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blaizn-orange to-blaizn-red rounded-2xl mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">BLAIZN</h1>
          <p className="text-gray-600">Chart Your Path to Success</p>
        </div>

        {/* Auth Card */}
        <Card className="p-8">
          {/* Mode Switcher */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={mode === 'login' ? 'primary' : 'secondary'}
              className="flex-1"
              onClick={() => mode !== 'login' && toggleMode()}
            >
              Login
            </Button>
            <Button
              variant={mode === 'signup' ? 'primary' : 'secondary'}
              className="flex-1"
              onClick={() => mode !== 'signup' && toggleMode()}
            >
              Sign Up
            </Button>
          </div>

          {/* General Error Message */}
          {generalError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{generalError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field (Signup only) */}
            {mode === 'signup' && (
              <Input
                type="text"
                name="name"
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
              />
            )}

            {/* Email Field */}
            <Input
              type="email"
              name="email"
              label="Email Address"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            {/* Password Field */}
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Processing...' : mode === 'login' ? 'Login' : 'Create Account'}
            </Button>
          </form>

          {/* Footer Text */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>🔒 Secure authentication • Your data is private</p>
          </div>
        </Card>

        {/* Toggle Text */}
        <p className="text-center mt-6 text-gray-600">
          {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
          {' '}
          <button
            onClick={toggleMode}
            className="text-blaizn-orange font-semibold hover:underline"
          >
            {mode === 'login' ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;