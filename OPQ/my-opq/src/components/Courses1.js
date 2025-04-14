import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseCard = ({ title, description, imageUrl, link }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
    <a href={link}>
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
    </a>
    <div className="p-4">
      <h4 className="text-xl font-semibold mb-2">
        <a href={link} className="text-dark hover:text-blue-600">{title}</a>
      </h4>
      <p className="text-gray-600">{description}</p>
    </div>
    <div className="p-4 border-t">
      <a href={link} className="text-blue-500 hover:underline">View More</a>
    </div>
  </div>
);

const Courses1 = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/getcourses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-semibold mb-2 text-blue-700">Courses</h2>
            <p className="text-lg text-gray-700">Professional technical skill development programs designed to help you reach your goals.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard
              key={course.course_id}
              title={course.title}
              description={course.description}
              imageUrl={course.imageUrl}
              link={course.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses1;
