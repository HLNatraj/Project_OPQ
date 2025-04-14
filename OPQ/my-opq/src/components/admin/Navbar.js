import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaBook, FaUsers, FaCalendarAlt, FaUser, FaCogs, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 h-full p-4 w-64 flex flex-col">
      <div className="text-white text-lg mb-4">
        <Link to="/admin/admindashboard" className="flex items-center hover:text-gray-300 transition">
          <FaTachometerAlt className="mr-2" />
          Admin Dashboard
        </Link>
      </div>
      <div className="space-y-4">
        <Link to="/admin/courses" className="flex items-center text-white hover:text-gray-300 transition">
          <FaBook className="mr-2" />
          Courses
        </Link>
        <Link to="/admin/batches" className="flex items-center text-white hover:text-gray-300 transition">
          <FaCalendarAlt className="mr-2" />
          Batches
        </Link>
        <Link to="/admin/workshoplist" className="flex items-center text-white hover:text-gray-300 transition">
          <FaCalendarAlt className="mr-2" />
          Workshops
        </Link>
        <Link to="/admin/students" className="flex items-center text-white hover:text-gray-300 transition">
          <FaUsers className="mr-2" />
          Students
        </Link>
        <Link to="/admin/Skill" className="flex items-center text-white hover:text-gray-300 transition">
          <FaCogs className="mr-2" />
          Skills
        </Link>
        <Link to="/admin/admin" className="flex items-center text-white hover:text-gray-300 transition">
          <FaUser className="mr-2" />
          Admins
        </Link>
        <Link to="/admin/userrequest" className="flex items-center text-white hover:text-gray-300 transition">
          <FaEnvelope className="mr-2" />
          User Requests
        </Link>
        <Link to="/logout" className="flex items-center text-white hover:text-gray-300 transition">
          <FaSignOutAlt className="mr-2" />
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
