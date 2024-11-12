import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const ManagerSignup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/manager_register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });
            console.log('Signup successful:', response.data);
            navigate('/manager-login');
        } catch (error) {
            console.error('Signup error:', error);
            setError(error.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-2">Signup</h2>
            {error && <p className="text-center text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Fullname</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            required
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={handleTogglePassword}
                            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                        >
                            {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        required
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition duration-200">
                    Signup
                </button>
            </form>
        </div>
    );
};

export default ManagerSignup;
