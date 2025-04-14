import React, { useState } from 'react';
import { FaCloud, FaKey, FaShieldAlt, FaList, FaArrowRight } from 'react-icons/fa';
import ReCAPTCHA from 'react-google-recaptcha';

const Aws = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    city: '',
    course_name: 'AWS Cloud Practitioner', // Hidden field to be sent to the backend
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
    const { name, email, contact, city, course_name } = formData;

    if (!name || !email || !contact || !city || !captchaValue) {
      alert('All fields are required and CAPTCHA must be completed.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/Awscourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, captchaToken: captchaValue }), // Include CAPTCHA token
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
          course_name: 'AWS Cloud Practitioner', // Reset hidden field
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AWS Cloud Practitioner</h1>
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
              Overview of AWS Cloud Practitioner fundamentals and their importance. Learn about AWS cloud concepts, security, technology, and billing & pricing. Understand the basic AWS services and their uses. Gain foundational knowledge necessary for AWS certifications.
            </p>
            <div className="my-4"></div>
            <h3 className="text-xl font-semibold mb-2">Course Details</h3>
            <p>
              The AWS Cloud Practitioner course provides a foundational understanding of AWS cloud concepts, services, and best practices. It is designed to give you a solid grasp of the AWS cloud platform and prepare you for the AWS Certified Cloud Practitioner exam.
            </p>
            <h4 className="text-lg font-semibold mb-2">Key Features</h4>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Introduction to AWS Cloud and its services.</li>
              <li>Understanding of AWS global infrastructure and architecture.</li>
              <li>Overview of AWS security and compliance.</li>
              <li>Introduction to AWS billing and pricing models.</li>
              <li>Preparation for the AWS Certified Cloud Practitioner exam.</li>
            </ul>
            <h4 className="text-lg font-semibold mb-2">About this AWS Cloud Practitioner Course</h4>
            <p>
              The AWS Cloud Practitioner course is designed to build a fundamental understanding of AWS cloud concepts and services. It focuses on helping individuals understand AWS's core services and their value in the cloud computing environment.
            </p>
            <h4 className="text-lg font-semibold mb-2">AWS Fundamentals Training and Certification</h4>
            <p>
              This training provides an introduction to AWS services, including compute, storage, and networking. It is ideal for individuals seeking to gain a foundational understanding of AWS and pursue AWS certifications.
            </p>
            <h4 className="text-lg font-semibold mb-2">What You Will Learn</h4>
            <ul className="list-disc list-inside mb-4 space-y-2">
              <li>Introduction to cloud computing and AWS.</li>
              <li>Understand AWS core services and their benefits.</li>
              <li>Explain the AWS global infrastructure and its components.</li>
              <li>Understand AWS pricing, billing, and support models.</li>
              <li>Prepare for the AWS Certified Cloud Practitioner exam.</li>
            </ul>
            <h4 className="text-lg font-semibold mb-2">Who Should Attend?</h4>
            <p>
              This course is suitable for individuals who are new to cloud computing and AWS, including those who want to learn about AWS cloud concepts and pursue AWS certifications. It is ideal for business professionals, project managers, and IT professionals.
            </p>
          </div>
        </div>
        
        <div className="md:w-1/3 p-4 sticky top-16 max-h-screen">
          <div className="card border p-4 rounded bg-white shadow-md">
            <div className="card-body">
              <img src="https://api.opqbootcamp.com/ImgUpload/873224_f1.jpg" alt="AWS Cloud" className="w-full h-auto border rounded mb-4" />
              <div className="mt-4 mb-4">
                <button onClick={handleFormToggle} className="w-full bg-red-500 px-4 text-white py-2 rounded mb-4 flex items-center justify-between">
                  <span>Enroll Now</span>
                  <FaArrowRight />
                </button>
              </div>
              <div className="features mt-6 space-y-4">
                <div className="feature-box flex items-center">
                  <div className="left-box mr-4">
                    <FaCloud size={24} />
                  </div>
                  <div className="right-box">
                    <h4 className="font-semibold">Learn about AWS cloud services and architecture</h4>
                  </div>
                </div>
                <div className="feature-box flex items-center">
                  <div className="left-box mr-4">
                    <FaKey size={24} />
                  </div>
                  <div className="right-box">
                    <h4 className="font-semibold">Understand AWS security and compliance</h4>
                  </div>
                </div>
                <div className="feature-box flex items-center">
                  <div className="left-box mr-4">
                    <FaShieldAlt size={24} />
                  </div>
                  <div className="right-box">
                    <h4 className="font-semibold">Gain foundational knowledge for AWS certifications</h4>
                  </div>
                </div>
                <div className="feature-box flex items-center">
                  <div className="left-box mr-4">
                    <FaList size={24} />
                  </div>
                  <div className="right-box">
                    <h4 className="font-semibold">Explore AWS billing and pricing models</h4>
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
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input type="text" id="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input type="email" id="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div className="mb-4">
                <label htmlFor="contact" className="block text-sm font-medium mb-1">Contact</label>
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
              <button type="submit" className="w-full bg-red-500 px-4 py-2 text-white rounded">Submit</button>
            </form>
            <button onClick={handleFormToggle} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">&times;</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Aws;
