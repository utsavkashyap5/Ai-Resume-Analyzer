import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import { validateLoginForm } from '../utils/validators';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateLoginForm(form);
    setErrors(validation);

    if (Object.values(validation).some(Boolean)) return;

    setLoading(true);
    setServerError('');

    try {
      await login(form.email, form.password);
      toast.success('Welcome back!', 'You have been logged in successfully.');
      navigate('/dashboard');
    } catch (err) {
      setServerError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <div className="text-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold text-[#2D2A26]"
        >
          Welcome back
        </motion.h1>
        <p className="text-sm text-[#6B665F] mt-1">
          Sign in to your account to continue
        </p>
      </div>

      {serverError && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-lg bg-[#C65A5A]/10 border border-[#C65A5A]/20 text-sm text-[#C65A5A] mb-6"
        >
          {serverError}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="you@example.com"
          icon={Mail}
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter your password"
            icon={Lock}
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] text-[#6B665F] hover:text-[#2D2A26] transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <Button type="submit" loading={loading} className="w-full" size="lg">
          Sign In
        </Button>
      </form>

      <p className="text-center text-sm text-[#6B665F] mt-6">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="text-[#8B5E3C] hover:text-[#6F472D] font-medium transition-colors">
          Create one
        </Link>
      </p>
    </Card>
  );
};

export default Login;
