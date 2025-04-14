import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="flex-1 p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Admin Dashboard</h1>

      {/* Cards container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Courses Card */}
        <div
          onClick={() => handleCardClick('/admin/courses')}
          className="bg-white shadow-md rounded-lg p-5 hover:bg-gray-200 cursor-pointer transition"
        >
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Courses</h2>
          <p className="text-gray-600">Manage the courses offered by the platform.</p>
        </div>

        {/* Batches Card */}
        <div
          onClick={() => handleCardClick('/admin/batches')}
          className="bg-white shadow-md rounded-lg p-5 hover:bg-gray-200 cursor-pointer transition"
        >
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Batches</h2>
          <p className="text-gray-600">Manage the batches for each course.</p>
        </div>

        {/* Workshops Card */}
        <div
          onClick={() => handleCardClick('/admin/workshoplist')}
          className="bg-white shadow-md rounded-lg p-5 hover:bg-gray-200 cursor-pointer transition"
        >
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Workshops</h2>
          <p className="text-gray-600">Manage the workshops available.</p>
        </div>

        {/* Students Card */}
        <div
          onClick={() => handleCardClick('/admin/students')}
          className="bg-white shadow-md rounded-lg p-5 hover:bg-gray-200 cursor-pointer transition"
        >
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Students</h2>
          <p className="text-gray-600">Manage the student records.</p>
        </div>

        {/* Skills Card */}
        <div
          onClick={() => handleCardClick('/admin/Skill')}
          className="bg-white shadow-md rounded-lg p-5 hover:bg-gray-200 cursor-pointer transition"
        >
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Skills</h2>
          <p className="text-gray-600">Manage the skills catalog.</p>
        </div>

        {/* Admins Card */}
        <div
          onClick={() => handleCardClick('/admin/admin')}
          className="bg-white shadow-md rounded-lg p-5 hover:bg-gray-200 cursor-pointer transition"
        >
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Admins</h2>
          <p className="text-gray-600">Manage the admin users.</p>
        </div>

        <div
          onClick={() => handleCardClick('/admin/userrequest')}
          className="bg-white shadow-md rounded-lg p-5 hover:bg-gray-200 cursor-pointer transition"
        >
          <h2 className="text-xl font-semibold mb-4 text-blue-600">User Request</h2>
          <p className="text-gray-600">User will request for any details or for any query.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
