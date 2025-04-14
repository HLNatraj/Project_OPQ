import React from 'react';
import { FaPalette, FaCss3Alt, FaRuler, FaMobileAlt, FaPlug, FaAdjust } from 'react-icons/fa';

const Tailwind = () => {
    return (
        <>
            <section className="relative bg-cover bg-center text-white py-16 mt-16" style={{ backgroundImage: 'url(/blog1.jfif)' }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative container mx-auto text-center z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Tailwind CSS</h1>
                    <ol className="breadcrumb text-center mb-6">
                        <li className="breadcrumb-item"><a href="/blogs" className="text-yellow-400 hover:underline">Blog</a></li>
                        <li className="breadcrumb-item active text-white" aria-current="page">Tailwind CSS Information</li>
                    </ol>
                </div>
            </section>

            <div className="container mx-auto p-6 md:p-12">
                <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                    <h2 className="text-2xl font-bold mb-4">Blog <strong>Overview</strong></h2>
                    <p className="text-gray-700 mb-4">Tailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without leaving your HTML. It simplifies styling by using a predefined set of classes that can be composed to create complex designs.</p>
                    <p className="text-gray-700">
                        Unlike traditional CSS frameworks, Tailwind encourages a more modular approach where you apply styles directly to elements through classes. This results in more manageable and reusable code.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                    <p className="mb-4">Tailwind CSS offers several features that make it an excellent choice for modern web development:</p>
                    <ul className="list-disc list-inside space-y-4">
                        {[
                            { name: 'Utility-First', description: 'Provides utility classes to build custom designs directly in your HTML.', icon: <FaPalette size={24} /> },
                            { name: 'Responsive Design', description: 'Built-in responsive design utilities to handle different screen sizes and devices.', icon: <FaMobileAlt size={24} /> },
                            { name: 'Customizability', description: 'Highly customizable with a configuration file to tailor the design system to your needs.', icon: <FaAdjust size={24} /> },
                            { name: 'Component-Friendly', description: 'Easily create reusable components by combining utility classes.', icon: <FaPlug size={24} /> },
                            { name: 'Performance Optimization', description: 'Purge unused CSS to minimize file size and improve performance.', icon: <FaCss3Alt size={24} /> },
                            { name: 'Design System', description: 'Enforces a consistent design system with predefined classes and color palettes.', icon: <FaRuler size={24} /> }
                        ].map((feature, index) => (
                            <li key={index} className="flex items-start space-x-4">
                                <div className="text-blue-600">{feature.icon}</div>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800">{feature.name}</h4>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Tailwind;
