import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faFileExport } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx'; // Import XLSX library

const Courselist = () => {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        link: '',
        imageUrl: ''
    });
    const [editCourse, setEditCourse] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const coursesPerPage = 3;
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/getcourses');
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCourse({ ...newCourse, [name]: value });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditCourse({ ...editCourse, [name]: value });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // returns formatted date in YYYY-MM-DD
    };

    const addCourse = async () => {
        const { title, description, start_date, end_date, link, imageUrl } = newCourse;
        if (!title || !description || !start_date || !end_date) {
            alert('Please fill in all required fields.');
            return;
        }
        const formattedCourse = {
            title,
            description,
            start_date,
            end_date,
            link,
            imageUrl
        };
        try {
            await axios.post('http://127.0.0.1:8000/api/addcourse', formattedCourse, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchCourses();
            setNewCourse({
                title: '',
                description: '',
                start_date: '',
                end_date: '',
                link: '',
                imageUrl: ''
            });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    const updateCourse = async () => {
        const { course_id, title, description, start_date, end_date, link, imageUrl } = editCourse;
        if (!title || !description || !start_date || !end_date) {
            alert('Please fill in all required fields.');
            return;
        }
        const formattedCourse = {
            title,
            description,
            start_date,
            end_date,
            link,
            imageUrl
        };
        try {
            await axios.put(`http://127.0.0.1:8000/api/updatecourse/${course_id}`, formattedCourse, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchCourses();
            setEditCourse(null);
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    const deleteCourse = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/deletecourse/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchCourses();
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(courses);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Courses');
        XLSX.writeFile(wb, 'courses.xlsx');
    };

    // Get current courses
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredCourses.length / coursesPerPage); i++) {
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
                <h1 className="text-2xl font-bold text-center text-blue-700">Course Manager</h1>
                <div className="flex space-x-2">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add Course
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
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>

            <div className="overflow-x-auto w-full max-w-5xl mx-auto">
                <table className="min-w-full bg-white border border-gray-200 w-full">
                    <thead>
                        <tr className="w-full bg-gray-200 text-gray-900 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Title</th>
                            <th className="py-3 px-6 text-left">Description</th>
                            <th className="py-3 px-6 text-left">Start Date</th>
                            <th className="py-3 px-6 text-left">End Date</th>
                            <th className="py-3 px-6 text-left">Image</th>
                            <th className="py-3 px-6 text-left">Link</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-1200 text-sm font-light">
                        {currentCourses.length > 0 ? (
                            currentCourses.map(course => (
                                <tr key={course.course_id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        {editCourse && editCourse.course_id === course.course_id ? (
                                            <input type="text" name="title" value={editCourse.title} onChange={handleEditInputChange} className="border p-2 rounded w-full" />
                                        ) : (
                                            course.title
                                        )}
                                    </td>
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        {editCourse && editCourse.course_id === course.course_id ? (
                                            <input type="text" name="description" value={editCourse.description} onChange={handleEditInputChange} className="border p-2 rounded w-full" />
                                        ) : (
                                            course.description
                                        )}
                                    </td>
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        {editCourse && editCourse.course_id === course.course_id ? (
                                            <input type="date" name="start_date" value={formatDate(editCourse.start_date)} onChange={handleEditInputChange} className="border p-2 rounded w-full" />
                                        ) : (
                                            new Date(course.start_date).toLocaleDateString('en-GB')
                                        )}
                                    </td>
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        {editCourse && editCourse.course_id === course.course_id ? (
                                            <input type="date" name="end_date" value={formatDate(editCourse.end_date)} onChange={handleEditInputChange} className="border p-2 rounded w-full" />
                                        ) : (
                                            new Date(course.end_date).toLocaleDateString('en-GB')
                                        )}
                                    </td>
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        {editCourse && editCourse.course_id === course.course_id ? (
                                            <input type="text" name="imageUrl" value={editCourse.imageUrl} onChange={handleEditInputChange} className="border p-2 rounded w-full" />
                                        ) : (
                                            <img src={course.imageUrl} alt={course.title} className="w-16 h-16 object-cover" />
                                        )}
                                    </td>
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        {editCourse && editCourse.course_id === course.course_id ? (
                                            <input type="text" name="link" value={editCourse.link} onChange={handleEditInputChange} className="border p-2 rounded w-full" />
                                        ) : (
                                            <a href={course.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">{course.link}</a>
                                        )}
                                    </td>
                                    <td className="py-3 px-6 text-center whitespace-nowrap">
                                        {editCourse && editCourse.course_id === course.course_id ? (
                                            <>
                                                <button onClick={updateCourse} className="text-green-500 hover:text-green-700 px-2 py-1">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                                <button onClick={() => setEditCourse(null)} className="text-gray-500 hover:text-gray-700 px-2 py-1">
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => setEditCourse(course)} className="text-yellow-500 hover:text-yellow-700 px-2 py-1">
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                                <button onClick={() => deleteCourse(course.course_id)} className="text-red-500 hover:text-red-700 px-2 py-1">
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="py-3 px-6 text-center">No courses found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-4">
                <ul className="flex space-x-1">
                    {renderPageNumbers()}
                </ul>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-4 w-full">
                        <h2 className="text-lg font-bold mb-4">Add Course</h2>
                        <input
                            type="text"
                            name="title"
                            placeholder="Course Title"
                            value={newCourse.title}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full mb-4"
                        />
                        <input
                            type="text"
                            name="description"
                            placeholder="Course Description"
                            value={newCourse.description}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full mb-4"
                        />
                        <input
                            type="date"
                            name="start_date"
                            value={newCourse.start_date}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full mb-4"
                        />
                        <input
                            type="date"
                            name="end_date"
                            value={newCourse.end_date}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full mb-4"
                        />
                        <input
                            type="text"
                            name="link"
                            placeholder="Course Link"
                            value={newCourse.link}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full mb-4"
                        />
                        <input
                            type="text"
                            name="imageUrl"
                            placeholder="Image URL"
                            value={newCourse.imageUrl}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full mb-4"
                        />
                        <div className="flex justify-end">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                                onClick={addCourse}
                            >
                                Add Course
                            </button>
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Courselist;
