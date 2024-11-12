import React, { useState, useEffect } from 'react';
import { Edit, Trash } from 'lucide-react';
import { SearchIcon } from 'lucide-react';
import axios from 'axios';

const EmployeeList = ({ handleEditEmployee, handleDeleteEmployee }) => {
    const [employees, setEmployees] = useState([]);
    
    // Fetch employee data from the backend
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const accessToken = localStorage.getItem('access_token');
                if (!accessToken) {
                    console.error("Access token not found.");
                    return;
                }

                const response = await axios.get('http://127.0.0.1:8000/management_employee/', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                // Assuming the backend returns the employee data in the format you provided
                setEmployees(response.data); // Set the fetched data to state
            } catch (error) {
                console.error('Error fetching employee data:', error);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold">Employee List</h2>
            <div className="flex items-center p-4">
                <SearchIcon className="w-5 h-5 text-gray-500 mr-2" />
                <input
                    type="text"
                    placeholder="Search..."
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
                                    src={employee.image}
                                    alt={`${employee.employee_name}`}
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
