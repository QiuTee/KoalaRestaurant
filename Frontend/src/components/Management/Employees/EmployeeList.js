import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import submission from '../../../utils/submission';
import { Edit, Trash } from 'lucide-react';

const EmployeeList = () => {
    const { tokens } = useAuth();
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!tokens || !tokens.access) {
            navigate("/login");
        }
    }, [tokens, navigate]);

    const loadEmployees = useCallback(async () => {
        if (!tokens?.access) return;
        try {
            const response = await submission('management_employee/', 'get', null, {
                Authorization: `Bearer ${tokens.access}`,
            });
            setEmployees(response);
        } catch (error) {
            console.error('Error loading employees:', error);
        }
    }, [tokens?.access]);

    useEffect(() => {
        loadEmployees();
    }, [loadEmployees]);

    const handleEditEmployee = (employeeId) => {
        console.log(`Edit employee with ID: ${employeeId}`);
    };

    const handleDeleteEmployee = async (employeeId) => {
        try {
            await submission(`management_employee/${employeeId}`, 'delete', null, {
                Authorization: `Bearer ${tokens.access}`,
            });
            setEmployees(employees.filter(emp => emp.id !== employeeId));
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Salary</th>
                        <th>Start Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.employee_name}</td>
                            <td>{employee.role}</td>
                            <td>{employee.phone}</td>
                            <td>{employee.email}</td>
                            <td>{employee.salary}</td>
                            <td>{employee.start_date}</td>
                            <td className="flex space-x-2">
                                <button className="text-yellow-500" onClick={() => handleEditEmployee(employee.id)}>
                                    <Edit />
                                </button>
                                <button className="text-red-500" onClick={() => handleDeleteEmployee(employee.id)}>
                                    <Trash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
