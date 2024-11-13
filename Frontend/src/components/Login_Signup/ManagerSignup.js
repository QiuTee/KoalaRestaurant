import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const ManagerSignup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        password: '',
        confirmPassword: '',
        managerFullName: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(''); // State for success notification

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
                password: formData.password,
                email: formData.email,
                retype_password: formData.confirmPassword,
                first_name: formData.firstName,
                last_name: formData.lastName,
                address: formData.address,
                phone_number: formData.phoneNumber,
                manager_fullname: formData.managerFullName
            });
            console.log('Signup successful:', response.data);

            // Set success message and clear error
            setSuccess('Signup Successfully');
            setError('');

            // Navigate to login page after a short delay
            setTimeout(() => {
                navigate('/manager-login');
            }, 2000); // 2-second delay
        } catch (error) {
            console.error('Signup error:', error);
            setError(error.response?.data?.error || 'An error occurred');
            setSuccess('');
        }
    };

    return (
        <div className="max-w-md mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-2">Signup</h2>
            {error && <p className="text-center text-red-500 mb-2">{error}</p>}
            {success && <p className="text-center text-green-500 mb-2">{success}</p>}
            <form onSubmit={handleSubmit}>
                {/* Form fields for signup details */}
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-sm font-medium mb-1">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        required
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                {/* Other fields (last name, full name, email, etc.) */}
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
