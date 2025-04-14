import React, { useState } from 'react';
import { FaLaptopCode, FaUsers, FaProjectDiagram, FaQuestionCircle, FaArrowRight } from 'react-icons/fa';
import ReCAPTCHA from 'react-google-recaptcha'; // Import reCAPTCHA component

const Fullstack = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    city: '',
    course_name: 'Full stack developer course' ,
  });
  const [captchaToken, setCaptchaToken] = useState(''); // State for reCAPTCHA token

  const handleFormToggle = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token); // Set reCAPTCHA token
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, contact, city } = formData;
    if (!name || !email || !contact || !city || !captchaToken) { // Validate CAPTCHA token
      alert('All fields are required and CAPTCHA must be completed.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/Fullstackcourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, captchaToken }), // Include CAPTCHA token in request
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setShowForm(false); // Close the form on successful submission
        setFormData({
          name: '',
          email: '',
          contact: '',
          city: '',
          course_name: 'Full stack developer course' ,
        });
        setCaptchaToken(''); // Clear CAPTCHA token
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <>
      <section className="relative bg-cover bg-center text-white py-16 mt-16" style={{ backgroundImage: 'url(/blog1.jfif)' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto text-center z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Full Stack Developer</h1>
          <ol className="breadcrumb text-center">
            <li className="breadcrumb-item active text-white" aria-current="page">Course Information</li>
          </ol>
        </div>
      </section>

      <div className="container mx-auto p-4 flex flex-col md:flex-row">
        <div className="md:w-2/3 p-4">
          <div className="course-overview">
            <h2 className="text-2xl font-bold mb-4">Course <strong>Overview</strong></h2>
            <div>OPQ Tech helps you learn everything you need to know to advance your tech profession.</div>
            <div className="my-4"></div>
            <div>
              Web developers that can work on all aspects of the website are in high demand. Because the market is short on full-stack developers, companies are looking for people who can manage both the backend and the front end. A full-stack developer's remuneration is on the higher end of the spectrum because it is a highly sought-after profession. By enrolling in this programme at OPQ Tech, you can advance your career. A full-stack web developer is a software specialist who is proficient in both front end and back end programming, as well as Angular and NodeJS in particular. Learn the essentials of HTML 5 as well as the fundamentals of JavaScript and TypeScript. NodeJS and Angular advanced concepts, as well as MongoDB concepts Learn how to debug programmes and acquire a certificate at the completion of this course.
            </div>
            <div className="my-4"></div>
            <h3 className="text-xl font-semibold mb-2">Course Details</h3>
            <p className="text-sm mb-4">
              Full Stack Developer is a comprehensive training program designed to equip participants with the skills and knowledge required to build end-to-end web applications. This course is intended for individuals who want to learn the latest web development technologies and frameworks.
            </p>
            <p className="mb-4">The course will cover a range of topics, including:</p>
            <ol className="list-decimal list-inside mb-4 space-y-2">
              <li>Basics of programming language</li>
              <li>Front-end development using HTML, CSS, JavaScript, and popular front-end frameworks such as React, Angular, or Vue.js</li>
              <li>Back-end development using popular programming languages such as Node.js, Python, Ruby on Rails, or PHP</li>
              <li>Databases and data modeling with SQL and NoSQL databases such as MySQL, MongoDB, or Postgres</li>
              <li>RESTful API design and development</li>
              <li>Deployment and hosting of web applications on cloud platforms such as AWS, Azure, or GCP</li>
              <li>Agile development methodologies, Git, and version control</li>
              <li>User experience design and testing, and accessibility considerations</li>
              <li>On Job Training - In Agile model, develop a realtime project using MERN stack.</li>
            </ol>
            <p className="mb-4">
              Throughout the course, participants will work on hands-on exercises, assignments, Q&amp;A sessions, mini and major projects to apply their learning in real-world scenarios. By the end of the course, participants will have an in-depth understanding of full-stack development principles and best practices, as well as the practical skills needed to build and deploy modern web applications.
            </p>
            <p className="font-semibold mb-2">Who Should Sign Up?</p>
            <ol className="list-decimal list-inside mb-4 space-y-2">
              <li>Beginners/Freshers</li>
              <li>Web Developers</li>
            </ol>
            <p className="font-semibold mb-2">How OPQ Tech Helps You?</p>
            <ol className="list-decimal list-inside mb-4 space-y-2">
              <li>Provide regular assignments to understand and solve real-time scenarios</li>
              <li>Free Webinars in Real Time</li>
              <li>Question and Answer sessions for enhancing skills</li>
              <li>Mock Interviews and Quizzes are available indefinitely</li>
              <li>Access to the course material and videos for the rest of your life</li>
              <li>Experiential Learning in Real-World Projects</li>
              <li>Offline Job Interviews</li>
              <li>Job Opportunities in Full Stack Web Development</li>
            </ol>
          </div>
        </div>

        <div className="md:w-1/3 p-4 sticky top-16 max-h-screen">
          <div className="card border p-4 rounded bg-white shadow-md">
            <div className="card-body">
              <img src="https://api.opqbootcamp.com/ImgUpload/873224_f1.jpg" alt="img" className="w-full h-auto border rounded mb-4" />
              <div className="mt-4 mb-4">
                <button onClick={handleFormToggle} className="w-full bg-red-500 px-4 text-white py-2 rounded mb-4 flex items-center justify-between">
                  <span>Enroll Now</span>
                  <FaArrowRight />
                </button>
              </div>
              <div className="features mt-6 space-y-4">
                <div className="feature-box flex items-center">
                  <div className="left-box mr-4">
                    <FaLaptopCode size={24} />
                  </div>
                  <div className="right-box">
                    <h4 className="font-semibold">Live virtual classes taught by industry experts</h4>
                  </div>
                </div>
                <div className="feature-box flex items-center">
                  <div className="left-box mr-4">
                    <FaUsers size={24} />
                  </div>
                  <div className="right-box">
                    <h4 className="font-semibold">Cohort based learning with peer-to-peer interaction</h4>
                  </div>
                </div>
                <div className="feature-box flex items-center">
                  <div className="left-box mr-4">
                    <FaProjectDiagram size={24} />
                  </div>
                  <div className="right-box">
                    <h4 className="font-semibold">Capstone projects involving real world data sets with virtual labs for hands-on learning</h4>
                  </div>
                </div>
                <div className="feature-box flex items-center">
                  <div className="left-box mr-4">
                    <FaQuestionCircle size={24} />
                  </div>
                  <div className="right-box">
                    <h4 className="font-semibold">24/7 teaching assistance with access to learner social forums</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

       {/* Modal Form */}
       {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4">Enrollment Form</h2>
            <form onSubmit={handleSubmit}>
              {/* Hidden input for course name */}
              <input type="hidden" id="courseName" value={formData.courseName} />
              
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input type="text" id="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input type="email" id="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div className="mb-4">
                <label htmlFor="contact" className="block text-sm font-medium mb-1">Contact Number</label>
                <input type="text" id="contact" value={formData.contact} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div className="mb-4">
                <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
                <input type="text" id="city" value={formData.city} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div className="mb-4">
                <ReCAPTCHA
                  sitekey="6LfL7SMqAAAAAPqHxtrhQhbTav4zheZlHfDrwgAa" 
                  onChange={handleCaptchaChange}
                />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={handleFormToggle} className="mr-2 bg-gray-500 text-white px-4 py-2 rounded">Close</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Fullstack;
