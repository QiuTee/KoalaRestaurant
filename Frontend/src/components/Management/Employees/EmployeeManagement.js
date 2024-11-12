import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);
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
    const [isFormVisible, setIsFormVisible] = useState(false);

    // Fetch employee data from backend
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/management_employee/'); // Replace with your API endpoint
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };
        fetchEmployees();
    }, []);

    // Handle Add/Update Employee
    const handleAddOrUpdateEmployee = async () => {
        try {
            if (editingId !== null) {
                // Update the employee
                await axios.put(`http://127.0.0.1:8000/management_employee/${editingId}`, formData);
                setEmployees(employees.map(emp => emp.id === editingId ? { ...emp, ...formData } : emp));
            } else {
                // Add a new employee
                const response = await axios.post('http://127.0.0.1:8000/management_employee/', formData);
                setEmployees([...employees, response.data]);
            }
        } catch (error) {
            console.error('Error adding/updating employee:', error);
        }

        // Reset the form after add/update
        setFormData({ name: '', role: '', dob: '', phone: '', email: '', salary: '', startDate: '' });
        setEditingId(null);
        setIsFormVisible(false);
    };

    // Handle Edit - Get employee data by ID
    const handleEditEmployee = (id) => {
        const employee = employees.find(emp => emp.id === id);
        if (employee) {
            setFormData({ ...employee });
            setEditingId(id); // Set the id of the employee being edited
            setIsFormVisible(true); // Show the form
        }
    };

    // Handle Delete Employee
    const handleDeleteEmployee = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/management_employee/${id}`); // Send delete request to backend
            setEmployees(employees.filter(emp => emp.id !== id)); // Remove employee from state
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
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
                onClick={() => setIsFormVisible(!isFormVisible)}
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
