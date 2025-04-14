// src/Contact.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import ReCAPTCHA from 'react-google-recaptcha';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        query: '',
        recaptcha: '',
    });

    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (!formData.name) errors.name = 'Name is required';
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.contact) errors.contact = 'Contact Number is required';
        if (!formData.query) errors.query = 'query is required';
        if (!formData.recaptcha) errors.recaptcha = 'Please complete the reCAPTCHA';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        console.log("hii")
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await fetch('https://njh5kfmlk8.execute-api.ap-south-1.amazonaws.com/Sample_table', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Your enquiry has been submitted successfully.');
                setFormData({
                    name: '',
                    email: '',
                    contact: '',
                    query: '',
                    recaptcha: '',
                });
                window.location.reload(); 
            } 
            else {
                alert('There was an issue submitting your enquiry. Please try again later.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <>
            <section className="relative bg-cover bg-center text-white py-16 mt-16" style={{ backgroundImage: 'url(/blog1.jfif)' }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative container mx-auto text-center z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact</h1>
                    <ol className="breadcrumb text-center">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active text-white" aria-current="page">Contact</li>
                    </ol>
                </div>
            </section>
            <section className="sptb contact-sec bg-white py-8">
                <div className="container mx-auto">
                    <div className="text-center mb-5 text-lg">
                        <p>We are looking forward to getting in collaboration with you</p>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-7/12">
                            <div className="left-contact-sec">
                                <div className="contact-subsec">
                                    <div className="flex flex-wrap">
                                        <div className="w-full lg:w-1/2 mb-4">
                                            <div className="icon-sec flex items-start">
                                                <span className="icon-call icon text-2xl mr-4">
                                                    <FontAwesomeIcon icon={faPhone} />
                                                </span>
                                                <div className="main flex flex-col">
                                                    <h4 className="main_title text-xl font-semibold">Phone</h4>
                                                    <a className="link text-blue-600" href="tel:08046810558">080-468-10558</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-1/2 mb-4">
                                            <div className="icon-sec flex items-start">
                                                <span className="icon-call icon text-2xl mr-4">
                                                    <FontAwesomeIcon icon={faEnvelope} />
                                                </span>
                                                <div className="main flex flex-col">
                                                    <h4 className="main_title text-xl font-semibold">Email</h4>
                                                    <a className="link text-blue-600" href="mailto:contact@opqbootcamp.com">contact@opqbootcamp.com</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full mb-4">
                                            <div className="icon-sec flex items-start">
                                                <span className="icon-call icon text-2xl mr-4">
                                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                                </span>
                                                <div className="main flex flex-col">
                                                    <h4 className="main_title text-xl font-semibold">Branch Office Address</h4>
                                                    <span>No. 22, Hosur Rd, 7th Block, Koramangala, Bangalore, Karnataka-560095</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full mb-4">
                                            <div className="icon-sec flex items-start">
                                                <span className="icon-call icon text-2xl mr-4">
                                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                                </span>
                                                <div className="main flex flex-col">
                                                    <h4 className="main_title text-xl font-semibold">Head Office Address</h4>
                                                    <span>OPQ TECH Bootcamp<br /> 2nd floor, Vijay Towers Vidya Nagar Main Road<br /> 1st Cross (West) Vidya Nagar,<br /> Bellary 583104, Karnataka.</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-1/2 mb-4">
                                            <div className="icon-sec flex items-start">
                                                <span className="icon-call icon text-2xl mr-4">
                                                    <FontAwesomeIcon icon={faClock} />
                                                </span>
                                                <div className="main flex flex-col">
                                                    <h4 className="main_title text-xl font-semibold">Timings</h4>
                                                    <span>Monday - Saturday <br />(09:00 AM - 06:00 PM)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="my-4">
                                    <iframe 
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.6017263158546!2d77.6099663144041!3d12.933300090880975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae145212c3466d%3A0x230cd174aea7922c!2sBLOCK-3%2C%20No.%2022%2C%20Hosur%20Rd%2C%207th%20Block%2C%20Koramangala%2C%20Bengaluru%2C%20Karnataka%20560095!5e0!3m2!1sen!2sin!4v1649313176765!5m2!1sen!2sin" 
                                        width="100%" 
                                        height="450" 
                                        style={{ border: 0 }} 
                                        allowFullScreen="" 
                                        referrerPolicy="no-referrer-when-downgrade" 
                                        title="Google Maps Location"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-5/12">
                            <div className="card mb-0 single-page customerpage contact">
                                <div className="card-body wrapper wrapper2 box-shadow-0">
                                    <div className="mb-6 text-dark">
                                        <h5 className="text-2xl font-semibold">Quick Enquiry</h5>
                                    </div>
                                    <form id="contactus" onSubmit={handleSubmit} noValidate>
                                        <div className="name mb-4">
                                            <input 
                                                type="text" 
                                                id="txtName" 
                                                autoComplete="off" 
                                                className="form-control" 
                                                placeholder="Name" 
                                                maxLength="100" 
                                                name="Name" 
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required 
                                            />
                                            {formErrors.name && <span className="text-danger">{formErrors.name}</span>}
                                        </div>
                                        <div className="mail mb-4">
                                            <input 
                                                type="email" 
                                                id="txtEmail" 
                                                autoComplete="off" 
                                                className="form-control" 
                                                placeholder="Email" 
                                                maxLength="100" 
                                                name="Email" 
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required 
                                            />
                                            {formErrors.email && <span className="text-danger">{formErrors.email}</span>}
                                        </div>
                                        <div className="number mb-4">
                                            <input 
                                                type="text" 
                                                id="txtPhone" 
                                                autoComplete="off" 
                                                className="form-control" 
                                                placeholder="Contact Number" 
                                                maxLength="15" 
                                                name="Phone" 
                                                value={formData.contact}
                                                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                                required 
                                            />
                                            {formErrors.contact && <span className="text-danger">{formErrors.contact}</span>}
                                        </div>
                                        <div className="query mb-4">
                                            <textarea 
                                                className="form-control" 
                                                name="query" 
                                                placeholder="query" 
                                                maxLength="1000" 
                                                value={formData.query}
                                                onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                                                required
                                            ></textarea>
                                            {formErrors.query && <span className="text-danger">{formErrors.query}</span>}
                                        </div>
                                        <div className="captcha mb-4">
                                            <ReCAPTCHA
                                                sitekey="6LchAa4qAAAAAMXJofPDlUw4_4FoSwNpoAw0_mcp"
                                                onChange={(value) => setFormData({ ...formData, recaptcha: value })}
                                            />
                                            {formErrors.recaptcha && <span className="text-danger">{formErrors.recaptcha}</span>}
                                        </div>
                                        <button type="submit" className="ml-2 btn px-4 py-2 text-white bg-red-500 btn-primary rounded">Send</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
