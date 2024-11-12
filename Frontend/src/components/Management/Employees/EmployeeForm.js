import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeForm = ({ formData, setFormData, handleAddEmployee, isEditing, handleCancel }) => {
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        if (isEditing && formData.image) {
            setPreviewImage(formData.image);
        }
    }, [isEditing, formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                image: file,
            });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const fields = [
        { name: 'name', type: 'text', placeholder: 'Employee Name' },
        { name: 'role', type: 'text', placeholder: 'Role' },
        { name: 'phone', type: 'text', placeholder: 'Phone Number' },
        { name: 'email', type: 'email', placeholder: 'Email' },
        { name: 'salary', type: 'number', placeholder: 'Salary' },
        { name: 'startDate', type: 'date' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const accessToken = localStorage.getItem('access_token');
    
        if (!accessToken) {
            console.error("Access token not found.");
            return;
        }
    
        try {
            const formDataToSend = new FormData();
            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }
    
            formDataToSend.append('employee_name', formData.name);
            formDataToSend.append('role', formData.role);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('salary', formData.salary);
            formDataToSend.append('start_date', formData.startDate);

            const response = await axios.post(
                'http://127.0.0.1:8000/management_employee/',
                formDataToSend,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            handleAddEmployee(response.data);
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    return (
        <div className="bg-white shadow rounded-lg p-4 mb-4 max-h-[80vh] w-[500px] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">
                {isEditing ? 'Edit Employee' : 'Add New Employee'}
            </h2>

            {fields.map((field) => (
                <input
                    key={field.name}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    placeholder={field.placeholder || ''}
                    className="border p-2 rounded mb-4 w-full"
                />
            ))}

            <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="border p-2 rounded mb-4 w-full"
                accept="image/*"
            />
            {previewImage && (
                <img
                    src={previewImage}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded mb-4"
                />
            )}

            <div className="flex justify-between">
                <button
                    onClick={handleSubmit}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    {isEditing ? 'Update Employee' : 'Add Employee'}
                </button>
                <button
                    onClick={handleCancel}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default EmployeeForm;
