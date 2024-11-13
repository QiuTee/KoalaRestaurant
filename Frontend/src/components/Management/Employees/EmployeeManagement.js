import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import submission from '../../../utils/submission';

const EmployeeManagement = () => {
    const { tokens } = useAuth();
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        name: '', role: '', phone: '', email: '', salary: '', start_date: ''
    });

    const [editingId, setEditingId] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        const fetchEmployees = async () => {
            if (!tokens?.access) return;
            try {
                const data = await submission('management_employee/', 'get', null, {
                    'Authorization': `Bearer ${tokens.access}`
                });
                setEmployees(data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };
        fetchEmployees();
    }, [tokens]);

    const handleAddOrUpdateEmployee = (newEmployee) => {
        if (editingId !== null) {
            // Update existing employee
            setEmployees(employees.map(emp => emp.id === editingId ? { ...emp, ...formData } : emp));
        } else {
            // Add new employee to the list
            setEmployees([...employees, newEmployee]);
        }

        setFormData({ name: '', role: '', phone: '', email: '', salary: '', start_date: '' });
        setEditingId(null);
        setIsFormVisible(false);
    };

    const handleEditEmployee = (id) => {
        const employee = employees.find(emp => emp.id === id);
        if (employee) {
            setFormData({ ...employee });
            setEditingId(id);
            setIsFormVisible(true);
        }
    };

    const handleDeleteEmployee = async (id) => {
        try {
            await submission(`management_employee/${id}/`, 'delete', null, {
                'Authorization': `Bearer ${tokens.access}`
            });
            setEmployees(employees.filter(emp => emp.id !== id));
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleCancel = () => {
        setIsFormVisible(false);
        setFormData({ name: '', role: '', phone: '', email: '', salary: '', start_date: '' });
        setEditingId(null);
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
