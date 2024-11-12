import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import EmployeeData from '../../../data/EmployeeData';

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState(EmployeeData);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        dob: '',
        phone: '',
        email: '',
        salary: '',
        startDate: ''
    });
    const [editingId, setEditingId] = useState(null);

    // Add or Update Employee based on editingId
    const handleAddOrUpdateEmployee = () => {
        if (editingId !== null) {
            // Update existing employee
            setEmployees(
                employees.map((emp) =>
                    emp.id === editingId ? { ...emp, ...formData } : emp
                )
            );
        } else {
            // Add new employee
            const newEmployee = { id: employees.length + 1, ...formData };
            setEmployees([...employees, newEmployee]);
        }

        // Reset form data and close form
        setFormData({ name: '', role: '', dob: '', phone: '', email: '', salary: '', startDate: '' });
        setEditingId(null);
        setIsFormVisible(false);
    };

    // Set form to edit mode with selected employee data
    const handleEditEmployee = (id) => {
        const employee = employees.find((emp) => emp.id === id);
        setFormData({ ...employee });
        setEditingId(id);  // Set editingId to switch to edit mode
        setIsFormVisible(true);
    };

    // Delete Employee by id
    const handleDeleteEmployee = (id) => {
        setEmployees(employees.filter((emp) => emp.id !== id));
    };
    const handleCancel = () => {
        setIsFormVisible(false);  // Close the form
        setFormData({ name: '', role: '', dob: '', phone: '', email: '', salary: '', startDate: '' }); // Reset form
        setEditingId(null); // Reset edit state
    };
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Employee Management</h1>

            <button
                onClick={() => {
                    setIsFormVisible(!isFormVisible);

                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
            >
                Add New Employee
            </button>

            {/* Employee Form Dialog */}
            {isFormVisible && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white shadow-lg rounded-lg p-6 w-[550px]">
                        <EmployeeForm
                            formData={formData}
                            setFormData={setFormData}
                            handleAddEmployee={handleAddOrUpdateEmployee}
                            isEditing={editingId !== null}
                            handleCancel={handleCancel}
                        />
                    </div>
                </div>
            )}

            <EmployeeList
                employees={employees}
                handleEditEmployee={handleEditEmployee}
                handleDeleteEmployee={handleDeleteEmployee}
            />
        </div>
    );
};

export default EmployeeManagement;
