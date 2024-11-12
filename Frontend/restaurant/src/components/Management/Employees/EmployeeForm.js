import React, { useState } from 'react';

const EmployeeForm = ({ formData, setFormData, handleAddEmployee, isEditing, handleCancel }) => {
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
                image: file,
            });
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    // Array of field configurations
    const fields = [
        { name: 'name', type: 'text', placeholder: 'Employee Name' },
        { name: 'role', type: 'text', placeholder: 'Role' },
        { name: 'dob', type: 'date' },
        { name: 'phone', type: 'text', placeholder: 'Phone Number' },
        { name: 'email', type: 'email', placeholder: 'Email' },
        { name: 'salary', type: 'number', placeholder: 'Salary' },
        { name: 'startDate', type: 'date' },
    ];

    return (
        <div className="bg-white shadow rounded-lg p-4 mb-4 max-h-[80vh] w-[500px] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">
                {isEditing ? 'Edit Employee' : 'Add New Employee'}
            </h2>

            {/* Map through fields array to render input fields */}
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

            {/* Image upload field */}
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
                    onClick={handleAddEmployee}
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
