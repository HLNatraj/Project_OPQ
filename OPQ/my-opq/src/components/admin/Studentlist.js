import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faSave, faTimes, faFileExport } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx'; // Import XLSX library

const Studentlist = () => {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        course_id: '',
        batch_id: ''
    });
    const [editStudent, setEditStudent] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const studentsPerPage = 5;
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/getstudents', {
                headers: {
                    'Authorization': `Bearer ${token}` // Send the token in the Authorization header
                }
            });
            console.log('Updated Students:', response.data); // Log the updated students
            setStudents(response.data); // Set the fetched students
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent(prevState => ({ ...prevState, [name]: value }));
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditStudent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };



    const addStudent = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/addstudent', newStudent, {
                headers: {
                    'Authorization': `Bearer ${token}` // Send the token in the Authorization header
                }
            });
            fetchStudents();
            setNewStudent({
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                course_id: '',
                batch_id: ''
            });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding student:', error);
        }
    };

    const updateStudent = async () => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/updatestudent/${editStudent.student_id}`, {
                first_name: editStudent.first_name,
                last_name: editStudent.last_name,
                email: editStudent.email,
                phone_number: editStudent.phone_number,
                course_id: editStudent.course_id,
                batch_id: editStudent.batch_id
            }, {
                headers: {
                    'Authorization': `Bearer ${token}` // Send the token in the Authorization header
                }
            });
            fetchStudents(); // Refresh the student list
            setEditStudent(null); // Close the edit form
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };


    const deleteStudent = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/deletestudent/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Send the token in the Authorization header
                }
            });
            fetchStudents();
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const exportToExcel = () => {
        // Create a worksheet from the students data
        const ws = XLSX.utils.json_to_sheet(students);
        // Create a new workbook
        const wb = XLSX.utils.book_new();
        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Students');
        // Export the workbook to Excel
        XLSX.writeFile(wb, 'students.xlsx');
    };

    // Get current students
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const filteredStudents = students.filter(student =>
        (student.first_name ? student.first_name.toLowerCase() : '').includes(searchTerm.toLowerCase()) ||
        (student.last_name ? student.last_name.toLowerCase() : '').includes(searchTerm.toLowerCase())
    );
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredStudents.length / studentsPerPage); i++) {
            pageNumbers.push(i);
        }

        return pageNumbers.map(number => (
            <li key={number} className={`px-3 py-1 border rounded ${currentPage === number ? 'bg-gray-300' : 'bg-white'}`}>
                <button onClick={() => handlePageChange(number)}>
                    {number}
                </button>
            </li>
        ));
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-center text-blue-700">Student Manager</h1>
                <div className="flex space-x-2">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add Student
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={exportToExcel}
                    >
                        <FontAwesomeIcon icon={faFileExport} className="mr-2" />
                        Export
                    </button>
                </div>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>

            <table className="min-w-full bg-white">
                <thead>
                    <tr className="w-full bg-gray-200 text-gray-900 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">First Name</th>
                        <th className="py-3 px-6 text-left">Last Name</th>
                        <th className="py-3 px-6 text-left">Email</th>
                        <th className="py-3 px-6 text-left">Phone Number</th>
                        <th className="py-3 px-6 text-left">Course Name</th> {/* Change to display course name */}
                        <th className="py-3 px-6 text-left">Batch Name</th>  {/* Change to display batch name */}
                        <th className="py-3 px-6 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-1100 text-sm font-light">
                    {currentStudents.map(student => (
                        <tr key={student.student_id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                {editStudent && editStudent.student_id === student.student_id ?
                                    <input type="text" name="first_name" value={editStudent.first_name} onChange={handleEditInputChange} className="border p-2 rounded w-full" /> :
                                    student.first_name}
                            </td>
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                {editStudent && editStudent.student_id === student.student_id ?
                                    <input type="text" name="last_name" value={editStudent.last_name} onChange={handleEditInputChange} className="border p-2 rounded w-full" /> :
                                    student.last_name}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {editStudent && editStudent.student_id === student.student_id ?
                                    <input type="email" name="email" value={editStudent.email} onChange={handleEditInputChange} className="border p-2 rounded w-full" /> :
                                    student.email}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {editStudent && editStudent.student_id === student.student_id ?
                                    <input type="text" name="phone_number" value={editStudent.phone_number} onChange={handleEditInputChange} className="border p-2 rounded w-full" /> :
                                    student.phone_number}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {editStudent && editStudent.student_id === student.student_id ? (
                                    <input
                                        type="text"
                                        name="course_id"
                                        value={editStudent.course_id}
                                        onChange={handleEditInputChange}
                                        className="border p-2 rounded w-full"
                                    />
                                ) : (
                                    student.course_name // You can display the course name here
                                )}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {editStudent && editStudent.student_id === student.student_id ? (
                                    <input
                                        type="text"
                                        name="batch_id"
                                        value={editStudent.batch_id}
                                        onChange={handleEditInputChange}
                                        className="border p-2 rounded w-full"
                                    />
                                ) : (
                                    student.batch_name // You can display the batch name here
                                )}
                            </td>


                            {/* <td className="py-3 px-6 text-left">{student.course_name}</td>  */}
                            {/* <td className="py-3 px-6 text-left">{student.batch_name}</td>  */}
                            <td className="py-3 px-6 text-left">
                                {editStudent && editStudent.student_id === student.student_id ? (
                                    <div className="flex items-center">
                                        <button onClick={updateStudent} className="mr-2 bg-green-500 text-white px-2 py-1 rounded">
                                            <FontAwesomeIcon icon={faSave} />
                                        </button>
                                        <button onClick={() => setEditStudent(null)} className="bg-red-500 text-white px-2 py-1 rounded">
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <button onClick={() => setEditStudent(student)} className="mr-2 bg-blue-500 text-white px-2 py-1 rounded">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button onClick={() => deleteStudent(student.student_id)} className="bg-red-500 text-white px-2 py-1 rounded">
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-center mt-4">
                <ul className="inline-flex items-center space-x-2">
                    {renderPageNumbers()}
                </ul>
            </div>

            {/* Modal for adding new student */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-md w-1/2">
                        <h2 className="text-2xl font-bold mb-4">Add New Student</h2>
                        <input
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            value={newStudent.first_name}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full mb-4"
                        />
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            value={newStudent.last_name}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full mb-4"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={newStudent.email}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full mb-4"
                        />
                        <input
                            type="text"
                            name="phone_number"
                            placeholder="Phone Number"
                            value={newStudent.phone_number}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full mb-4"
                        />
                        <input
                            type="text"
                            name="course_id"
                            placeholder="Course ID"
                            value={newStudent.course_id}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full mb-4"
                        />
                        <input
                            type="text"
                            name="batch_id"
                            placeholder="Batch ID"
                            value={newStudent.batch_id}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full mb-4"
                        />
                        <div className="flex justify-end space-x-4">
                            <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">
                                Cancel
                            </button>
                            <button onClick={addStudent} className="bg-green-500 text-white px-4 py-2 rounded">
                                Add Student
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Studentlist;
