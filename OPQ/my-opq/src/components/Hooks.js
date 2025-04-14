import React from 'react';
import { FaReact, FaCode, FaStar, FaPuzzlePiece, FaCog, FaLock, FaListAlt, FaCalendarAlt, FaCheckCircle, FaBolt, FaEye, FaTag, FaGlobe } from 'react-icons/fa';

const Hooks = () => {
    return (
        <>
            <section className="relative bg-cover bg-center text-white py-16 mt-16" style={{ backgroundImage: 'url(/blog1.jfif)' }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative container mx-auto text-center z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">React Hooks</h1>
                    <ol className="breadcrumb text-center mb-6">
                        <li className="breadcrumb-item"><a href="/blogs" className="text-yellow-400 hover:underline">Blog</a></li>
                        <li className="breadcrumb-item active text-white" aria-current="page">Hooks Blog Information</li>
                    </ol>
                </div>
            </section>

            <div className="container mx-auto p-6 md:p-12">
                <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                    <h2 className="text-2xl font-bold mb-4">Blog <strong>Overview</strong></h2>
                    <p className="text-gray-700 mb-4">OPQ Tech helps you learn everything you need to know to advance your tech profession.</p>
                    <p className="text-gray-700">
                        Hooks in React are functions that let you use state and other React features without writing a class. Introduced in React 16.8, hooks enable you to manage component state, perform side effects, and handle other React functionalities in functional components.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Blog Details</h3>
                    <p className="mb-4">The course will cover a range of topics, including:</p>
                    <ul className="list-disc list-inside space-y-4">
                        {[
                            { name: 'useState', description: 'Manages state in a functional component.', icon: <FaReact size={24} /> },
                            { name: 'useEffect', description: 'Performs side effects like data fetching, subscriptions, or manual DOM changes after rendering.', icon: <FaCode size={24} /> },
                            { name: 'useContext', description: 'Accesses the context value without needing to wrap components in a Consumer.', icon: <FaStar size={24} /> },
                            { name: 'useReducer', description: 'An alternative to useState for managing complex state logic.', icon: <FaPuzzlePiece size={24} /> },
                            { name: 'useRef', description: 'Accesses a DOM element or stores a mutable value that persists across renders.', icon: <FaCog size={24} /> },
                            { name: 'useMemo', description: 'Optimizes performance by memoizing expensive calculations.', icon: <FaLock size={24} /> },
                            { name: 'useCallback', description: 'Memoizes a function to prevent unnecessary re-renders.', icon: <FaListAlt size={24} /> },
                            { name: 'useLayoutEffect', description: 'Similar to useEffect, but runs synchronously after all DOM mutations.', icon: <FaCalendarAlt size={24} /> },
                            { name: 'useImperativeHandle', description: 'Customizes the instance value that is exposed when using ref.', icon: <FaCheckCircle size={24} /> },
                            { name: 'useDebugValue', description: 'Displays a label in React DevTools for custom hooks, aiding in debugging.', icon: <FaBolt size={24} /> },
                            { name: 'useTransition', description: 'Marks updates as non-urgent, allowing other state updates to interrupt them.', icon: <FaEye size={24} /> },
                            { name: 'useDeferredValue', description: 'Defers the re-rendering of a value until the rendering is less urgent.', icon: <FaTag size={24} /> },
                            { name: 'useId', description: 'Generates unique IDs for components that need them, such as for accessible form controls.', icon: <FaGlobe size={24} /> },
                            { name: 'Custom Hooks', description: 'Custom JavaScript functions that can use other hooks internally to encapsulate and reuse logic.', icon: <FaStar size={24} /> },
                            { name: 'Rules of Hooks', description: 'Rules to follow when using hooks.', icon: <FaStar size={24} />, children: [
                                { description: 'Only call hooks at the top level: Don’t call hooks inside loops, conditions, or nested functions.' },
                                { description: 'Only call hooks from React functions: Hooks can be used in React function components or custom hooks, not regular JavaScript functions.' }
                            ]}
                        ].map((hook, index) => (
                            <li key={index} className="flex items-start space-x-4">
                                <div className="text-blue-600">{hook.icon}</div>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800">{hook.name}</h4>
                                    <p className="text-gray-600">{hook.description}</p>
                                    {hook.children && (
                                        <ul className="list-disc list-inside mt-2 text-gray-600">
                                            {hook.children.map((child, i) => (
                                                <li key={i} className="ml-6">{child.description}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Hooks;
