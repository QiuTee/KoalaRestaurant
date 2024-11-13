import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import submission from '../../../utils/submission';

const EmployeeForm = ({ formData, setFormData, handleAddEmployee, isEditing, handleCancel }) => {
    const { tokens } = useAuth();
    const [previewImage, setPreviewImage] = useState(null);

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
                imageFile: file,
            });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const accessToken = tokens?.access;
        if (!accessToken) {
            console.error("Access token not found.");
            return;
        }

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('image', formData.imageFile);
            formDataToSend.append('employee_name', formData.name);
            formDataToSend.append('role', formData.role);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('salary', formData.salary);
            formDataToSend.append('start_date', formData.startDate);

            const response = await submission(
                'management_employee/',
                'post',
                formDataToSend,
                {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                }
            );

            if (response && response.status === '200') {
                console.log("Employee added successfully:", response.data);
                handleAddEmployee(response.data);
            } else {
                console.error('Failed to add employee:', response);
            }
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    const fields = [
        { name: 'name', type: 'text', placeholder: 'Employee Name' },
        { name: 'role', type: 'text', placeholder: 'Role' },
        { name: 'email', type: 'email', placeholder: 'Email' },
        { name: 'phone', type: 'tel', placeholder: 'Phone Number' },
        { name: 'salary', type: 'number', placeholder: 'Salary' },
        { name: 'startDate', type: 'date', placeholder: 'Start Date' },
    ];

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
