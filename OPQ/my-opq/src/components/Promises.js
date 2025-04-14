import React from 'react';
import { FaSync, FaCheckCircle, FaExclamationCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';

const Promises = () => {
    return (
        <>
            <section className="relative bg-cover bg-center text-white py-16 mt-16" style={{ backgroundImage: 'url(/blog1.jfif)' }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative container mx-auto text-center z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Mastering JavaScript Promises</h1>
                    <ol className="breadcrumb text-center mb-6">
                        <li className="breadcrumb-item"><a href="/blogs" className="text-yellow-400 hover:underline">Blog</a></li>
                        <li className="breadcrumb-item active text-white" aria-current="page">JavaScript Promises Information</li>
                    </ol>
                </div>
            </section>

            <div className="container mx-auto p-6 md:p-12">
                <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                    <h2 className="text-2xl font-bold mb-4">Blog <strong>Overview</strong></h2>
                    <p className="text-gray-700 mb-4">JavaScript promises represent the eventual completion (or failure) of an asynchronous operation and its resulting value. Promises provide a cleaner alternative to callbacks and help manage asynchronous code more effectively.</p>
                    <p className="text-gray-700">
                        Introduced in ECMAScript 6 (ES6), promises allow you to write asynchronous code that is more readable and maintainable. They can be in one of three states: pending, fulfilled, or rejected.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Key Concepts</h3>
                    <p className="mb-4">Here are the essential concepts to understand when working with JavaScript promises:</p>
                    <ul className="list-disc list-inside space-y-4">
                        {[
                            { name: 'Promise States', description: 'A promise can be in one of three states: pending, fulfilled, or rejected.', icon: <FaSync size={24} /> },
                            { name: 'Promise Resolution', description: 'When a promise is fulfilled, it is resolved with a value. If rejected, it is resolved with an error.', icon: <FaCheckCircle size={24} /> },
                            { name: 'Chaining', description: 'Promises can be chained using `.then()` to handle multiple asynchronous operations sequentially.', icon: <FaInfoCircle size={24} /> },
                            { name: 'Error Handling', description: 'Use `.catch()` to handle errors in the promise chain.', icon: <FaExclamationCircle size={24} /> },
                            { name: 'Promise.all()', description: 'Execute multiple promises in parallel and wait for all of them to complete.', icon: <FaSync size={24} /> },
                            { name: 'Promise.race()', description: 'Return a promise that resolves or rejects as soon as one of the promises in the iterable resolves or rejects.', icon: <FaSync size={24} /> },
                            { name: 'Promise.allSettled()', description: 'Wait for all promises to either resolve or reject, and returns their results.', icon: <FaInfoCircle size={24} /> },
                            { name: 'Promise.any()', description: 'Return the first promise that resolves, or aggregate errors if all promises are rejected.', icon: <FaTimesCircle size={24} /> }
                        ].map((concept, index) => (
                            <li key={index} className="flex items-start space-x-4">
                                <div className="text-blue-600">{concept.icon}</div>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800">{concept.name}</h4>
                                    <p className="text-gray-600">{concept.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Promises;
