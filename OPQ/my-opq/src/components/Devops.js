import React, { useState } from 'react';
import { FaTools, FaCogs, FaBullhorn, FaList, FaArrowRight } from 'react-icons/fa';
import ReCAPTCHA from 'react-google-recaptcha';

const Devops = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    city: '',
    course_name: 'DevOps Bootcamp'  // Hidden column for course name
  });
  const [captchaValue, setCaptchaValue] = useState('');

  const handleFormToggle = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, contact, city, courseName } = formData;

    if (!name || !email || !contact || !city || !captchaValue) {
      alert('All fields are required and CAPTCHA must be completed.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/Devopscourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, captchaToken: captchaValue }), // Include CAPTCHA token and hidden course name
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setShowForm(false);
        setFormData({
          name: '',
          email: '',
          contact: '',
          city: '',
          course_name: 'DevOps Bootcamp'
        });
        setCaptchaValue('');
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">DevOps Bootcamp</h1>
          <ol className="breadcrumb text-center">
            <li className="breadcrumb-item active text-white" aria-current="page">Course Information</li>
          </ol>
        </div>
      </section>
      
      <div className="container mx-auto p-4 flex flex-col md:flex-row">
        <div className="md:w-2/3 p-4">
          <div className="course-overview">
            <h2 className="text-2xl font-bold mb-4">Course <strong>Overview</strong></h2>
            <p>
              Overview of the OPQ Tech DevOps Bootcamp tools and their importance. Continuous Integration & Continuous Deployment / Delivery Overview. How to Choose the Best Deployment, Testing, Management, and Orchestration Methods. Select the appropriate modules and optimize the current deployment. Tools, Framework, and Mindset Challenges in DevOps Implementation.
            </p>
            <div className="my-4"></div>
            <h3 className="text-xl font-semibold mb-2">Course Details</h3>
            <p>
              The OPQ Tech DevOps Bootcamp will teach you how to master the art and science of optimizing the development and operational activities of your entire team. This DevOps course will show you how to use configuration management tools such as Puppet, Salt Stack, and Ansible to gain experience in continuous deployment.
            </p>
            <h4 className="text-lg font-semibold mb-2">Key Features</h4>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>The OPQ Tech DevOps Bootcamp Program is designed to provide you with the opportunity to learn the latest technologies in the IT industry.</li>
              <li>Course is designed to help you become a DevOps Engineer while providing you with the opportunity to work alongside talented professionals.</li>
              <li>Led by experienced Software Development Academy trainers preparing you for an OPQ Tech DevOps Engineer role.</li>
              <li>Opportunity to join a thriving IT sector with new skills and international working environment access.</li>
            </ul>
            <h4 className="text-lg font-semibold mb-2">About this DevOps Bootcamp</h4>
            <p>
              OPQ Tech DevOps introduces DevOps, a movement emphasizing communication, collaboration, integration, and automation to improve work flow between developers and IT operations professionals. It aims to maximize IT value flow to customers with benefits like increased customer satisfaction, higher quality, faster delivery, and lower costs.
            </p>
            <h4 className="text-lg font-semibold mb-2">OPQ Tech DevOps Fundamentals Training and Certification</h4>
            <p>
              This training provides foundational knowledge of DevOps principles and practices, motivating you to lead and mentor others in DevOps. The course is a prerequisite for all other levels of the certification scheme, and upon completion, you'll receive the DevOps Foundation certificate.
            </p>
            <h4 className="text-lg font-semibold mb-2">What You Will Learn</h4>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Define and discuss key concepts and principles of OPQ Tech DevOps Bootcamp.</li>
              <li>Explain business advantages of continuous delivery.</li>
              <li>Describe Service Delivery processes.</li>
              <li>Understand test automation, infrastructure automation, and build and deployment automation.</li>
              <li>Understand the relationship between DevOps and Lean/Agile methodologies.</li>
              <li>Summarize case studies of organizations transforming to Adaptive IT and DevOps models.</li>
              <li>Learn about popular DevOps tools and critical success factors for implementing DevOps.</li>
            </ul>
            <h4 className="text-lg font-semibold mb-2">Who Should Attend?</h4>
            <p>
              Anyone needing a thorough understanding of DevOps principles including project managers, IT quality assurance professionals, testing, and service management professionals, and anyone involved in IT services. Ideal for beginners or seasoned professionals aiming for career change or advancement in IT.
            </p>
          </div>
        </div>
        
        <div className="md:w-1/3 p-4 sticky top-16 max-h-screen">
          <div className="card border p-4 rounded bg-white shadow-md">
            <div className="card-body">
              <img src="https://api.opqbootcamp.com/ImgUpload/873224_f1.jpg" alt="DevOps" className="w-full h-auto border rounded mb-4" />
              <div className="mt-4 mb-4">
                <button onClick={handleFormToggle} className="w-full bg-red-500 px-4 text-white py-2 rounded mb-4 flex items-center justify-between">
                  <span>Enroll Now</span>
                  <FaArrowRight />
                </button>
              </div>
              <div className="features mt-6 space-y-4">
                <div className="feature-box flex items-center">
                  <div className="left-box mr-4">
                    <FaTools size={24} />
                  </div>
                  <div className="right-box">
                    <h4 className="font-semibold">Learn to use tools like Puppet, Salt Stack, and Ansible</h4>
                  </div>
                </div>
                <div className="feature-box flex items-center">
                  <div className="left-box mr-4">
                    <FaCogs size={24} />
                  </div>
                  <div className="right-box">
                    <h4 className="font-semibold">Master continuous integration and deployment</h4>
                  </div>
                </div>
                <div className="feature-box flex items-center">
                  <div className="left-box mr-4">
                    <FaBullhorn size={24} />
                  </div>
                  <div className="right-box">
                    <h4 className="font-semibold">Gain new skills to join an international IT environment</h4>
                  </div>
                </div>
                <div className="feature-box flex items-center">
                  <div className="left-box mr-4">
                    <FaList size={24} />
                  </div>
                  <div className="right-box">
                    <h4 className="font-semibold">Understand and implement DevOps methodologies</h4>
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

export default Devops;