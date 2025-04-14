import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faFileExport } from '@fortawesome/free-solid-svg-icons';
import * as XLSX from 'xlsx'; // Import XLSX library

const Batchlist = () => {
    const [batches, setBatches] = useState([]);
    const [newBatch, setNewBatch] = useState({
        name: '',
        start_date: '',
        end_date: '',
        course_id: '' // Assuming batches are linked to courses
    });
    const [editBatch, setEditBatch] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const batchesPerPage = 5;
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchBatches();
    }, []);

    const fetchBatches = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/getbatches', {
                headers: {
                    'Authorization': `Bearer ${token}` // Send the token in the Authorization header
                }
            });
            setBatches(response.data);
        } catch (error) {
            console.error('Error fetching batches:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBatch(prevState => ({ ...prevState, [name]: value }));
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditBatch(prevState => ({ ...prevState, [name]: value }));
    };


    const addBatch = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/addbatch', {
                course_id: newBatch.course_id,
                batch_name: newBatch.name,
                start_date: newBatch.start_date,
                end_date: newBatch.end_date
            }, {
                headers: {
                    'Authorization': `Bearer ${token}` // Send the token in the Authorization header
                }
            });
            fetchBatches();
            setNewBatch({ name: '', start_date: '', end_date: '', course_id: '' });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error adding batch:', error);
        }
    };

    const updateBatch = async () => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/updatebatch/${editBatch.batch_id}`, editBatch, {
                headers: {
                    'Authorization': `Bearer ${token}` // Send the token in the Authorization header
                }
            });
            fetchBatches();
            setEditBatch(null);
        } catch (error) {
            console.error('Error updating batch:', error);
        }
    };

    const deleteBatch = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/deletebatch/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Send the token in the Authorization header
                }
            });
            fetchBatches();
        } catch (error) {
            console.error('Error deleting batch:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const exportToExcel = () => {
        // Create a worksheet from the batches data
        const ws = XLSX.utils.json_to_sheet(batches.map(batch => ({
            ...batch,
            start_date: formatDate(batch.start_date),
            end_date: formatDate(batch.end_date)
        })));
        // Create a new workbook
        const wb = XLSX.utils.book_new();
        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Batches');
        // Export the workbook to Excel
        XLSX.writeFile(wb, 'batches.xlsx');
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    // Get current batches
    const indexOfLastBatch = currentPage * batchesPerPage;
    const indexOfFirstBatch = indexOfLastBatch - batchesPerPage;
    const filteredBatches = batches.filter(batch =>
        (batch.batch_name ? batch.batch_name.toLowerCase() : '').includes(searchTerm.toLowerCase())
    );
    const currentBatches = filteredBatches.slice(indexOfFirstBatch, indexOfLastBatch);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredBatches.length / batchesPerPage); i++) {
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
                <h1 className="text-2xl font-bold text-blue-700">Batch Manager</h1>
                <div className="flex space-x-2">
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add Batch
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
                    placeholder="Search batches..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>

            {/* // Updated table to include Batch ID */}
            <table className="min-w-full bg-white">
                <thead>
                    <tr className="w-full bg-gray-200 text-gray-900 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Batch ID</th> {/* Add Batch ID column */}
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Start Date</th>
                        <th className="py-3 px-6 text-left">End Date</th>
                        <th className="py-3 px-6 text-left">Course ID</th>
                        <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-900 text-sm font-light">
                    {currentBatches.map(batch => (
                        <tr key={batch.batch_id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">{batch.batch_id}</td> {/* Display Batch ID */}
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                                {editBatch && editBatch.batch_id === batch.batch_id ? (
                                    <input
                                        type="text"
                                        name="batch_name"  // <-- Change this to "batch_name"
                                        value={editBatch.batch_name}  // <-- Use "editBatch.batch_name"
                                        onChange={handleEditInputChange}
                                        className="border p-2 rounded w-full"
                                    />
                                ) : (
                                    batch.batch_name
                                )}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {editBatch && editBatch.batch_id === batch.batch_id ? (
                                    <input
                                        type="date"
                                        name="start_date"
                                        value={editBatch.start_date}
                                        onChange={handleEditInputChange}
                                        className="border p-2 rounded w-full"
                                    />
                                ) : (
                                    formatDate(batch.start_date)
                                )}
                            </td>
                            <td className="py-3 px-6 text-left">
                                {editBatch && editBatch.batch_id === batch.batch_id ? (
                                    <input
                                        type="date"
                                        name="end_date"
                                        value={editBatch.end_date}
                                        onChange={handleEditInputChange}
                                        className="border p-2 rounded w-full"
                                    />
                                ) : (
                                    formatDate(batch.end_date)
                                )}
                            </td>
                            <td className="py-3 px-6 text-left">{batch.course_id}</td>
                            <td className="py-3 px-6 text-center">
                                {editBatch && editBatch.batch_id === batch.batch_id ? (
                                    <>
                                        <button onClick={updateBatch} className="text-green-500 mx-2">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button onClick={() => setEditBatch(null)} className="text-gray-500">
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => setEditBatch(batch)} className="text-green-500 mx-2">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button onClick={() => deleteBatch(batch.batch_id)} className="text-red-500">
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            <div className="mt-4 flex justify-between items-center">
                <ul className="flex space-x-2">
                    {renderPageNumbers()}
                </ul>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Add Batch</h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="Batch Name"
                            value={newBatch.name}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full mb-2"
                        />
                        <input
                            type="date"
                            name="start_date"
                            value={newBatch.start_date}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full mb-2"
                        />
                        <input
                            type="date"
                            name="end_date"
                            value={newBatch.end_date}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full mb-2"
                        />
                        <input
                            type="text"
                            name="course_id"
                            placeholder="Course ID"
                            value={newBatch.course_id}
                            onChange={handleInputChange}
                            className="border p-2 rounded w-full mb-4"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={addBatch}
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

export default Batchlist;
