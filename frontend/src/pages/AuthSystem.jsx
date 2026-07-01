import React, { useState } from 'react';

export default function AuthSystem() {
  // 1. Core State Management
  const [isLoginView, setIsLoginView] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Form Field States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // 2. Handle User Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, phone, password }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Registration failed');
      }

      setMessage(data.message);
      // Auto-switch to login view after successful registration
      setIsLoginView(true);
      // Reset registration-specific fields
      setFullName('');
      setPhone('');
    } catch (err) {
      setError(err.message);
    }
  };

  // 3. Handle User Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Login failed');
      }

      // Save token and user profile details straight to browser storage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setToken(data.token);
      setUser(data.user);
      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    }
  };

  // 4. Handle User Logout
  const handleLogout = async () => {
    try {
      // Hit backend logout endpoint to clear backend session/cookies cleanly
      await fetch('http://localhost:3000/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('Backend logout failed, clearing local state anyway');
    } finally {
      // Wipe the frontend clean of all tokens and user objects
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
      setEmail('');
      setPassword('');
      setMessage('Logged out successfully.');
    }
  };

  // --- RENDERING LAYER ---

  // Conditional Rendering: If token exists, show the Dashboard & Logout View
  if (token && user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl text-center border border-gray-100">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4 text-2xl font-bold">
            ✓
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome Back!</h2>
          <p className="mt-1 text-sm text-gray-500">You are securely authenticated.</p>
          
          <div className="my-6 rounded-lg bg-gray-50 p-4 text-left text-sm border border-gray-100 space-y-2">
            <p className="text-gray-700"><span className="font-semibold text-gray-900">Name:</span> {user.fullName}</p>
            <p className="text-gray-700"><span className="font-semibold text-gray-900">Email:</span> {user.email}</p>
            {user.phone && <p className="text-gray-700"><span className="font-semibold text-gray-900">Phone:</span> {user.phone}</p>}
            <p className="text-gray-700"><span className="font-semibold text-gray-900">Role:</span> <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 uppercase tracking-wide">{user.role}</span></p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full rounded-xl bg-red-600 px-4 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:scale-[0.98]"
          >
            Logout Securely
          </button>
        </div>
      </div>
    );
  }

  // Auth View (Forms for Login and Registration)
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-gray-100">
        
        {/* Dynamic Header Titles */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {isLoginView ? 'Account Login' : 'Create Account'}
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            {isLoginView ? 'Welcome back, please enter your details.' : 'Join us today by filling out your info.'}
          </p>
        </div>

        {/* Status Alerts Notification System */}
        {error && <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 font-medium border border-red-200">{error}</div>}
        {message && <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-600 font-medium border border-green-200">{message}</div>}

        {/* Dynamic Multi-form Wrapper */}
        <form onSubmit={isLoginView ? handleLogin : handleRegister} className="space-y-4">
          
          {/* Registration Extra Field: Full Name */}
          {!isLoginView && (
            <div>
              <label className="block text-sm font-semibold text-gray-700">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                placeholder="John Doe"
              />
            </div>
          )}

          {/* Core Input Field: Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              placeholder="you@example.com"
            />
          </div>

          {/* Registration Extra Field: Phone Number */}
          {!isLoginView && (
            <div>
              <label className="block text-sm font-semibold text-gray-700">Phone Number (Optional)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                placeholder="9876543210"
              />
            </div>
          )}

          {/* Core Input Field: Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              placeholder="••••••••"
            />
          </div>

          {/* Action Trigger Submit Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white shadow-md transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-[0.98] mt-2"
          >
            {isLoginView ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        {/* Toggle Footer Navigation Link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          {isLoginView ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => {
              setIsLoginView(!isLoginView);
              setError('');
              setMessage('');
            }}
            className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition duration-150 focus:outline-none"
          >
            {isLoginView ? 'Register here' : 'Login here'}
          </button>
        </div>

      </div>
    </div>
  );
}
