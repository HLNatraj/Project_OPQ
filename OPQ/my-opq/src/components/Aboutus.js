// src/components/Aboutus.js
import React from 'react';
import { FaUsers, FaLaptop, FaGlobe, FaNewspaper } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { FaCheck } from 'react-icons/fa';

const Aboutus = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="p-6 md:p-12 mt-14">
      <header className="text-center mb-12 ">
        <h1 className="text-4xl font-bold mb-4 text-blue-700">About Us</h1>
        <p className="text-lg">Learn more about our mission, vision, and team.</p>
      </header>

      <main className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 mb-12">
        <section className="p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Our Mission</h2>
          <p className="text-gray-700">
            OPQ Tech has diverse approaches on education. We are on a mission to be the most trusted lifelong learning partner, along with helping every member on the global platform to achieve their career success and reaching their goals.
          </p>
        </section>

        <section className="p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Our Vision</h2>
          <p className="text-gray-700">
            We envision a world where everyone has the opportunity to thrive in the digital age.
          </p>
        </section>

        <section className="p-6 bg-gray-100 rounded-lg shadow-md ">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Meet Our Team</h2>
          <div className="flex flex-col space-y-6">
            <div className="flex items-center space-x-4">
              {/* <img src="/path/to/team-member1.jpg" alt="Team Member 1" className="w-16 h-16 rounded-full" /> */}
              <div>
                <h3 className="text-lg font-medium">Naren</h3>
                <p className="text-gray-600">Founder & CEO</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* <img src="/path/to/team-member2.jpg" alt="Team Member 2" className="w-16 h-16 rounded-full" /> */}
              <div>
                <h3 className="text-lg font-medium">Prem</h3>
                <p className="text-gray-600">Chief Operating Officer</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <section ref={ref} className="bg-cover bg-center py-16" style={{ backgroundImage: "url('/assets/img/counter-bg.png')" }}>
        <div className="container mx-auto">
          <div className="text-center flex flex-wrap">
            <div className="w-full md:w-1/2 lg:w-1/4 p-4">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="bg-primary text-blue-700 rounded-full p-4 mb-4 inline-block">
                  <FaUsers size={24} />
                </div>
                <h5 className="text-xl text-green-500 font-semibold">Total Learners</h5>
                <h2 className="text-4xl text-black font-bold counter">
                  {inView && <CountUp end={200} duration={2.5} />}
                </h2>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 p-4">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="bg-primary text-blue-700 rounded-full p-4 mb-4 inline-block">
                  <FaLaptop size={24} />
                </div>
                <h5 className="text-xl text-green-500 font-semibold">Total Tutors</h5>
                <h2 className="text-4xl font-bold counter">
                  {inView && <CountUp end={10} duration={2.5} />}
                </h2>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 p-4">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="bg-primary text-blue-700 rounded-full p-4 mb-4 inline-block">
                  <FaGlobe size={24} />
                </div>
                <h5 className="text-xl text-green-500 font-semibold">Total Placements</h5>
                <h2 className="text-4xl font-bold counter">
                  {inView && <CountUp end={80} duration={2.5} />}
                </h2>
              </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 p-4">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <div className="bg-primary text-blue-700 rounded-full p-4 mb-4 inline-block">
                  <FaNewspaper size={24} />
                </div>
                <h5 className="text-xl font-semibold text-green-500">Total Courses</h5>
                <h2 className="text-4xl text-black font-bold counter">
                  {inView && <CountUp end={3} duration={2.5} />}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto">
          <div className="about-right-sec">
            <div className="section-title text-center mb-8">
              <h2 className="text-3xl font-bold text-blue-700">In Specific</h2>
            </div>
            <p className="text-lg text-gray-700 mb-6">
              Be it DevOps, Cyber Security, Cloud Computing, Project Management, Digital Marketing, or Data Science, we will train you. With hands-on, interactive learning you learn 7 times more effectively than reading or watching course material.
            </p>
            <h4 className="text-xl font-semibold text-blue-700 mb-4">That’s why OPQ Tech’s Bootcamp provides:</h4>
            <ul className="sub-list list-disc pl-5 text-gray-700 mb-6">
              <li className="mb-2"><FaCheck className="inline-block text-green-500 mr-2" />Live virtual classes taught by industry experts</li>
              <li className="mb-2"><FaCheck className="inline-block text-green-500 mr-2" />Cohort based learning with peer-to-peer interaction</li>
              <li className="mb-2"><FaCheck className="inline-block text-green-500 mr-2" />Capstone projects involving real world data sets with virtual labs for hands-on learning</li>
              <li className="mb-2"><FaCheck className="inline-block text-green-500 mr-2" />24/7 teaching assistance with access to learner social forums</li>
            </ul>
            <h4 className="text-xl font-semibold text-blue-700 mb-4">What More!</h4>
            <p className="text-lg text-gray-700 mb-4">
              We also organize workshops and corporate training.
            </p>
            <p className="text-lg text-gray-700">
              Upskill with OPQ Tech BootCamp. Get a job - Guaranteed!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aboutus;
