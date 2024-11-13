import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import submission from '../../../utils/submission';
import { Edit, Trash, SearchIcon } from 'lucide-react';


const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/drm1mr9va/";

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
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold">Employee List</h2>
            <div className="flex items-center p-4">
                <SearchIcon className="w-5 h-5 text-gray-500 mr-2" />
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="p-2 bg-gray-100 rounded-md focus:outline-none"
                />
            </div>
            <table className="w-full table-auto mt-4">
                <thead>
                    <tr>
                        <th className="border p-2">Photo</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Role</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Phone</th>
                        <th className="border p-2">Salary</th>
                        <th className="border p-2">Start Date</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td className="border p-2 flex justify-center items-center">
                                <img
                                    src={`${CLOUDINARY_BASE_URL}${employee.image}`}
                                    alt={`${employee.name}`}
                                    className="w-16 h-16 object-cover"
                                />
                            </td>
                            <td className="border p-2">{employee.employee_name}</td>
                            <td className="border p-2">{employee.role}</td>
                            <td className="border p-2">{employee.email}</td>
                            <td className="border p-2">{employee.phone}</td>
                            <td className="border p-2">${employee.salary}</td>
                            <td className="border p-2">{employee.start_date}</td>
                            <td className="border p-2">
                                <button
                                    onClick={() => handleEditEmployee(employee.id)}
                                    className="text-blue-500"
                                >
                                    <Edit className="text-blue-600" />
                                </button>
                                <button
                                    onClick={() => handleDeleteEmployee(employee.id)}
                                    className="text-red-500 ml-2"
                                >
                                    <Trash className="text-red-600" />
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
