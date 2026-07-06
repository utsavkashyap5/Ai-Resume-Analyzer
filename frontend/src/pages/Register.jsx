import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';
import { validateRegisterForm } from '../utils/validators';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const toast = useToast();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
  });
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
    const validation = validateRegisterForm(form);
    setErrors(validation);

    if (Object.values(validation).some(Boolean)) return;

    setLoading(true);
    setServerError('');

    const payload = {
      fullName: form.fullName.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
    };
    if (form.phone.trim()) payload.phone = form.phone.trim();

    try {
      await register(payload);
      toast.success('Account created!', 'You have been registered successfully.');
      navigate('/dashboard');
    } catch (err) {
      setServerError(err.message || 'Registration failed. Please try again.');
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
          Create your account
        </motion.h1>
        <p className="text-sm text-[#6B665F] mt-1">
          Start optimizing your resumes with AI
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
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="John Doe"
          icon={User}
          value={form.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />

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
            placeholder="At least 6 characters"
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

        <Input
          label="Phone (optional)"
          type="tel"
          name="phone"
          placeholder="+1 (555) 123-4567"
          icon={Phone}
          value={form.phone}
          onChange={handleChange}
          error={errors.phone}
        />

        <Button type="submit" loading={loading} className="w-full" size="lg">
          Create Account
        </Button>
      </form>

      <p className="text-center text-sm text-[#6B665F] mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-[#8B5E3C] hover:text-[#6F472D] font-medium transition-colors">
          Sign in
        </Link>
      </p>
    </Card>
  );
};

export default Register;
