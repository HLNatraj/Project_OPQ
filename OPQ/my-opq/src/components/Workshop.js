import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendar, FaArrowRight } from 'react-icons/fa';

const defaultImage = 'ws.png'; 

const Workshop = () => {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/getWorkshops');
      
        const updatedWorkshops = response.data.map(workshop => ({
          ...workshop,
          image: defaultImage
        }));
        setWorkshops(updatedWorkshops);
      } catch (error) {
        console.error('Error fetching workshops:', error);
      }
    };

    fetchWorkshops();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div>
      <section className="relative bg-cover bg-center text-white py-16 mt-16" style={{ backgroundImage: 'url(/blog1.jfif)' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto text-center z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Workshop</h1>
          <ol className="breadcrumb text-center">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active text-white" aria-current="page">Workshops</li>
          </ol>
        </div>
      </section>
  
      <section className="py-12 workshop-lists">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.map(workshop => (
              <div key={workshop.id} className="card bg-white overflow-hidden shadow-md rounded-lg">
                <a href={workshop.link}>
                  <img
                    src={workshop.image}
                    alt={workshop.title}
                    className="w-full h-32 object-cover"
                  />
                </a>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    <a href={workshop.link} className="hover:text-blue-500">{workshop.title}</a>
                  </h3>
                  <p className="text-gray-700 mb-2">{workshop.agenda}</p>
                  <p className="text-gray-600 mb-4">{workshop.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <h4 className="date text-gray-700 flex items-center text-sm">
                        <FaCalendar className="mr-1" aria-hidden="true" />
                        {formatDate(workshop.date)} <small>({workshop.time})</small>
                      </h4>
                      <h4 className="price text-gray-900 font-semibold text-sm">{workshop.price}</h4>
                    </div>
                    <a href={workshop.link} className="text-blue-500 hover:text-blue-700 flex items-center text-sm">
                      <FaArrowRight className="mr-1" aria-hidden="true" />
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Workshop;
