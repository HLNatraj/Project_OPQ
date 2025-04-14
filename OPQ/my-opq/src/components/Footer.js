import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaChevronRight } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h6 className="font-semibold mb-4">Our Company</h6>
              <ul className="space-y-2">
                <li><a href="/" className="flex items-center hover:text-gray-400"><FaChevronRight className="mr-2" /> Home</a></li>
                <li><a href="/about-us" className="flex items-center hover:text-gray-400"><FaChevronRight className="mr-2" /> About Us</a></li>
                <li><a href="/blogs" className="flex items-center hover:text-gray-400"><FaChevronRight className="mr-2" /> Blogs</a></li>
                <li><a href="/contact-us" className="flex items-center hover:text-gray-400"><FaChevronRight className="mr-2" /> Contact Us</a></li>
              </ul>
            
            </div>
            <div>
              <h6 className="font-semibold mb-4">Courses</h6>
              <ul className="space-y-2">
                <li><a href="/courses/full-stack-developer" className="hover:text-gray-400">Full Stack Developer Course</a></li>
                <li><a href="/courses/aws-cloud-practitioner" className="hover:text-gray-400">AWS Cloud Practitioner</a></li>
                <li><a href="/courses/devops-bootcamp" className="hover:text-gray-400">Devops Bootcamp</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Quick Links</h6>
              <ul className="space-y-2">
                <li><a href="/login" className="flex items-center hover:text-gray-400"><FaChevronRight className="mr-2" /> Login</a></li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Follow Us</h6>
              <ul className="space-y-2">
                <li>No. 22, Hosur Rd, 7th Block, Koramangala, Bangalore, Karnataka-560095</li>
                <li><a href="contact@opqbootcamp.com" className="hover:text-gray-400">contact@opqbootcamp.com</a></li>
                <li><a href="tel:023564789" className="hover:text-gray-400">+91 124568</a></li>
              </ul>
              <ul className="flex space-x-4 mt-4">
                <li>
                  <a href="https://www.facebook.com/opqbootcamp/" target="_blank" rel="noreferrer" className="hover:text-gray-400">
                    <FaFacebook />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/OPQBootcamp" target="_blank" rel="noreferrer" className="hover:text-gray-400">
                    <FaTwitter />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/join_opqtech/" target="_blank" rel="noreferrer" className="hover:text-gray-400">
                    <FaInstagram />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            Copyright © 2022 <a href="www.opq.com" className="text-primary hover:underline">Opqbootcamp</a>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
