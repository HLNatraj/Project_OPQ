import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/24/outline'; 
import * as XLSX from 'xlsx'; // Import XLSX library
import { faFileExport }  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Quickresponselist = () => {
    const [responses, setResponses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const responsesPerPage = 5;
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchResponses();
    }, []);

    const fetchResponses = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/getquickresponses',{
                headers: {
                    'Authorization': `Bearer ${token}` // Send the token in the Authorization header
                }
            });
            setResponses(response.data);
        } catch (error) {
            console.error('Error fetching quick responses:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/deletequickresponse/${id}`,{
                headers: {
                    'Authorization': `Bearer ${token}` // Send the token in the Authorization header
                }
            });
            setResponses(responses.filter(response => response.id !== id));
        } catch (error) {
            console.error('Error deleting quick response:', error);
        }
    };
    const exportToExcel = () => {
        // Create a worksheet from the students data
        const ws = XLSX.utils.json_to_sheet(responses);
        // Create a new workbook
        const wb = XLSX.utils.book_new();
        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, 'responses');
        // Export the workbook to Excel
        XLSX.writeFile(wb, 'User_responses.xlsx');
    };


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Get current responses
    const indexOfLastResponse = currentPage * responsesPerPage;
    const indexOfFirstResponse = indexOfLastResponse - responsesPerPage;
    const filteredResponses = responses.filter(response =>
        response.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const currentResponses = filteredResponses.slice(indexOfFirstResponse, indexOfLastResponse);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredResponses.length / responsesPerPage); i++) {
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
                <h1 className="text-2xl font-bold text-center text-blue-700">User Request</h1>
            
                <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={exportToExcel}
                    >
                        <FontAwesomeIcon icon={faFileExport} className="mr-2" />
                        Export
                    </button>
              
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>

            <div className="overflow-x-auto w-full max-w-5xl mx-auto">
                <table className="min-w-full bg-white border border-gray-200 w-full">
                    <thead>
                        <tr className="bg-gray-200 text-gray-900 uppercase text-sm leading-normal">
                            <th className="py-3 px-4 text-left w-1/6">Name</th>
                            <th className="py-3 px-4 text-left w-1/6">Email</th>
                            <th className="py-3 px-4 text-left w-1/6">Contact</th>
                            <th className="py-3 px-4 text-left w-2/6">Message</th>
                            <th className="py-3 px-4 text-left w-1/6">Date</th>
                            <th className="py-3 px-4 text-left w-1/6">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-1100 text-sm font-light">
                        {currentResponses.map(response => (
                            <tr key={response.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-4 text-left whitespace-nowrap">{response.name}</td>
                                <td className="py-3 px-4 text-left whitespace-nowrap">{response.email}</td>
                                <td className="py-3 px-4 text-left whitespace-nowrap">{response.contact}</td>
                                <td className="py-3 px-4 text-left">{response.message}</td>
                                <td className="py-3 px-4 text-left">
                                    {new Date(response.created_at).toLocaleDateString()}
                                </td>
                                <td className="py-3 px-4 text-left">
                                    <button
                                        onClick={() => handleDelete(response.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4">
                <ul className="flex justify-center space-x-2">
                    {renderPageNumbers()}
                </ul>
            </div>
        </div>
    );
};

export default Quickresponselist;
