import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import * as apiService from '../../services/apiService';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'user'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const response = await apiService.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role
      });
      
      login(response.data.user, response.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg min-h-[85vh] py-16 px-5 flex justify-center items-center">
      <div className="bg-white border-1.5 border-borderColor rounded-3xl p-8 md:p-10 w-full max-w-[540px] shadow-sm">
        <div className="text-center mb-8">
          <div className="text-[44px] mb-3">🌶️</div>
          <h1 className="font-serif text-[32px] text-text leading-none mb-2">Create Account</h1>
          <p className="text-[14px] text-text-muted">Join the Flavour It seller & buyer community</p>
        </div>

        {error && <div className="bg-primary/10 border-l-4 border-primary text-primary-dark px-4 py-3 rounded-lg text-[14px] font-medium mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4.5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-text-muted uppercase tracking-wider">First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full px-4 py-3 border-1.5 border-borderColor rounded-xl font-sans text-[14px] text-text bg-gray-50 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-text-muted uppercase tracking-wider">Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full px-4 py-3 border-1.5 border-borderColor rounded-xl font-sans text-[14px] text-text bg-gray-50 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-bold text-text-muted uppercase tracking-wider">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border-1.5 border-borderColor rounded-xl font-sans text-[14px] text-text bg-gray-50 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-text-muted uppercase tracking-wider">Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border-1.5 border-borderColor rounded-xl font-sans text-[14px] text-text bg-gray-50 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-text-muted uppercase tracking-wider">Account Type</label>
              <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-3 border-1.5 border-borderColor rounded-xl font-sans text-[14px] text-text bg-gray-50 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 cursor-pointer">
                <option value="user">Normal User (Buyer)</option>
                <option value="officer">Officer (Seller/Vendor)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-text-muted uppercase tracking-wider">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-3 border-1.5 border-borderColor rounded-xl font-sans text-[14px] text-text bg-gray-50 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-text-muted uppercase tracking-wider">Confirm Password</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="w-full px-4 py-3 border-1.5 border-borderColor rounded-xl font-sans text-[14px] text-text bg-gray-50 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full h-[52px] border-none rounded-xl text-[16px] font-bold text-white shadow-[0_4px_14px_rgba(230,0,0,0.35)] cursor-pointer transition-all duration-300 outline-none flex items-center justify-center gap-2 mt-4 ${loading ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(230,0,0,0.45)]'}`}
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-[14px] text-text-muted mt-8">
          Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
