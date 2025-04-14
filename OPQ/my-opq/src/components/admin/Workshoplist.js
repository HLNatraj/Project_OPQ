import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faSave, faTimes, faFileExport } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx'; // Import XLSX library

const WorkshopList = () => {
    const [workshops, setWorkshops] = useState([]);
    const [newWorkshop, setNewWorkshop] = useState({
        title: '',
        agenda: '',
        date: '',
        time: '',
        price: '',
        image: '',
        link: '',
        description: ''
    });
    const [editWorkshop, setEditWorkshop] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const workshopsPerPage = 3;
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchWorkshops();
    }, []);

    const fetchWorkshops = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/getWorkshops');
            setWorkshops(response.data);
        } catch (error) {
            console.error('Error fetching workshops:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewWorkshop(prevState => ({ ...prevState, [name]: value }));
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditWorkshop(prevState => ({ ...prevState, [name]: value }));
    };

    const addWorkshop = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/addWorkshop', newWorkshop, {
                headers: {
                    'Authorization': `Bearer ${token}` // Send the token in the Authorization header
                }
            });
            fetchWorkshops();
            setNewWorkshop({
                title: '',
                agenda: '',
                date: '',
                time: '',
                price: '',
                image: '',
                link: '',
                description: ''
            });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding workshop:', error);
        }
    };

    const updateWorkshop = async () => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/updateWorkshop/${editWorkshop.id}`, editWorkshop, {
                headers: {
                    'Authorization': `Bearer ${token}` // Send the token in the Authorization header
                }
            });
            fetchWorkshops();
            setEditWorkshop(null);
        } catch (error) {
            console.error('Error updating workshop:', error);
        }
    };

    const deleteWorkshop = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/deleteWorkshop/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Send the token in the Authorization header
                }
            });
            fetchWorkshops();
        } catch (error) {
            console.error('Error deleting workshop:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const exportToExcel = () => {
        // Create a worksheet from the workshops data
        const ws = XLSX.utils.json_to_sheet(workshops);
        // Create a new workbook
        const wb = XLSX.utils.book_new();
        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Workshops');
        // Export the workbook to Excel
        XLSX.writeFile(wb, 'workshops.xlsx');
    };

    // Get current workshops
    const indexOfLastWorkshop = currentPage * workshopsPerPage;
    const indexOfFirstWorkshop = indexOfLastWorkshop - workshopsPerPage;
    const filteredWorkshops = workshops.filter(workshop =>
        (workshop.title ? workshop.title.toLowerCase() : '').includes(searchTerm.toLowerCase())
    );
    const currentWorkshops = filteredWorkshops.slice(indexOfFirstWorkshop, indexOfLastWorkshop);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredWorkshops.length / workshopsPerPage); i++) {
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
                <h1 className="text-2xl font-bold text-center text-blue-700">Workshop Manager</h1>
                <div className="flex space-x-2">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add Workshop
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
                    placeholder="Search workshops..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>

            <div className="overflow-x-auto w-full max-w-5xl mx-auto">
                <table className="min-w-full bg-white border border-gray-200 w-full">
                    <thead>
                        <tr className="bg-gray-200 text-gray-900 uppercase text-sm leading-normal">
                            <th className="py-3 px-4 text-left whitespace-nowrap">Title</th>
                            <th className="py-3 px-4 text-left whitespace-nowrap">Agenda</th>
                            <th className="py-3 px-4 text-left whitespace-nowrap">Date</th>
                            <th className="py-3 px-4 text-left whitespace-nowrap">Time</th>
                            <th className="py-3 px-4 text-left whitespace-nowrap">Price</th>
                            <th className="py-3 px-4 text-left whitespace-nowrap">Image</th>
                            <th className="py-3 px-4 text-left whitespace-nowrap">Link</th>
                            <th className="py-3 px-4 text-left whitespace-nowrap">Description</th>
                            <th className="py-3 px-4 text-left whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-1100 text-sm font-light">
                        {currentWorkshops.map(workshop => (
                            <tr key={workshop.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-4 text-left whitespace-nowrap">
                                    {editWorkshop && editWorkshop.id === workshop.id ? (
                                        <input type="text" name="title" value={editWorkshop.title} onChange={handleEditInputChange} className="border p-2 rounded w-full" />
                                    ) : (
                                        workshop.title
                                    )}
                                </td>
                                <td className="py-3 px-4 text-left whitespace-nowrap">
                                    {editWorkshop && editWorkshop.id === workshop.id ? (
                                        <textarea name="agenda" value={editWorkshop.agenda} onChange={handleEditInputChange} className="border p-2 rounded w-full" />
                                    ) : (
                                        workshop.agenda
                                    )}
                                </td>
                                <td className="py-3 px-4 text-left whitespace-nowrap">
                                    {editWorkshop && editWorkshop.id === workshop.id ? (
                                        <input type="date" name="date" value={editWorkshop.date} onChange={handleEditInputChange} className="border p-2 rounded w-full" />
                                    ) : (
                                        new Date(workshop.date).toLocaleDateString()
                                    )}
                                </td>
                                <td className="py-3 px-4 text-left whitespace-nowrap">
                                    {editWorkshop && editWorkshop.id === workshop.id ? (
                                        <input type="text" name="time" value={editWorkshop.time} onChange={handleEditInputChange} className="border p-2 rounded w-full" />
                                    ) : (
                                        workshop.time
                                    )}
                                </td>
                                <td className="py-3 px-4 text-left whitespace-nowrap">
                                    {editWorkshop && editWorkshop.id === workshop.id ? (
                                        <input type="text" name="price" value={editWorkshop.price} onChange={handleEditInputChange} className="border p-2 rounded w-full" />
                                    ) : (
                                        workshop.price
                                    )}
                                </td>
                                <td className="py-3 px-4 text-left whitespace-nowrap">
                                    {editWorkshop && editWorkshop.id === workshop.id ? (
                                        <input type="text" name="image" value={editWorkshop.image} onChange={handleEditInputChange} className="border p-2 rounded w-full" />
                                    ) : (
                                        <img src={workshop.image} alt={workshop.title} className="w-16 h-16 object-cover" />
                                    )}
                                </td>
                                <td className="py-3 px-4 text-left whitespace-nowrap">
                                    {editWorkshop && editWorkshop.id === workshop.id ? (
                                        <input type="text" name="link" value={editWorkshop.link} onChange={handleEditInputChange} className="border p-2 rounded w-full" />
                                    ) : (
                                        <a href={workshop.link} target="_blank" rel="noopener noreferrer">Link</a>
                                    )}
                                </td>
                                <td className="py-3 px-4 text-left whitespace-nowrap">
                                    {editWorkshop && editWorkshop.id === workshop.id ? (
                                        <textarea name="description" value={editWorkshop.description} onChange={handleEditInputChange} className="border p-2 rounded w-full" />
                                    ) : (
                                        workshop.description
                                    )}
                                </td>
                                <td className="py-3 px-4 text-left whitespace-nowrap">
                                    {editWorkshop && editWorkshop.id === workshop.id ? (
                                        <>
                                            <button onClick={updateWorkshop} className="text-green-500 mr-2">
                                                <FontAwesomeIcon icon={faSave} />
                                            </button>
                                            <button onClick={() => setEditWorkshop(null)} className="text-red-500">
                                                <FontAwesomeIcon icon={faTimes} />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => setEditWorkshop(workshop)} className="text-blue-500 mr-2">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                            <button onClick={() => deleteWorkshop(workshop.id)} className="text-red-500">
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                    Showing {indexOfFirstWorkshop + 1} to {Math.min(indexOfLastWorkshop, filteredWorkshops.length)} of {filteredWorkshops.length} entries
                </div>
                <ul className="flex space-x-2">
                    {renderPageNumbers()}
                </ul>
            </div>

           
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
                        <h2 className="text-xl font-bold mb-4">Add New Workshop</h2>
                        <input
                            type="text"
                            name="title"
                            value={newWorkshop.title}
                            onChange={handleInputChange}
                            placeholder="Title"
                            className="border p-2 rounded w-full mb-2"
                        />
                        <textarea
                            name="agenda"
                            value={newWorkshop.agenda}
                            onChange={handleInputChange}
                            placeholder="Agenda"
                            className="border p-2 rounded w-full mb-2"
                        />
                        <input
                            type="date"
                            name="date"
                            value={newWorkshop.date}
                            onChange={handleInputChange}
                            placeholder="Date"
                            className="border p-2 rounded w-full mb-2"
                        />
                        <input
                            type="text"
                            name="time"
                            value={newWorkshop.time}
                            onChange={handleInputChange}
                            placeholder="Time"
                            className="border p-2 rounded w-full mb-2"
                        />
                        <input
                            type="number"
                            name="price"
                            value={newWorkshop.price}
                            onChange={handleInputChange}
                            placeholder="Price"
                            className="border p-2 rounded w-full mb-2"
                        />
                        <input
                            type="text"
                            name="image"
                            value={newWorkshop.image}
                            onChange={handleInputChange}
                            placeholder="Image URL"
                            className="border p-2 rounded w-full mb-2"
                        />
                        <input
                            type="text"
                            name="link"
                            value={newWorkshop.link}
                            onChange={handleInputChange}
                            placeholder="Link"
                            className="border p-2 rounded w-full mb-2"
                        />
                        <textarea
                            name="description"
                            value={newWorkshop.description}
                            onChange={handleInputChange}
                            placeholder="Description"
                            className="border p-2 rounded w-full mb-2"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={addWorkshop}
                                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Add
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkshopList;
