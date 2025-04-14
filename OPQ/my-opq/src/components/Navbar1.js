import React from 'react';
import { Menu } from '@headlessui/react';
import { Link } from 'react-router-dom';
import logo from 'F:/mern/React/OPQ/my-opq/src/opq-logo.png';

const Navbar1 = () => {
  return (
    <nav className="bg-gray-200 p-4 flex items-center justify-between">
      <div className="mr-4">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10" />
        </Link>
      </div>
      <ul className="hidden md:flex space-x-8 items-center">
        <li>
          <Link to="/" className="text-black hover:text-blue-500 px-4 py-2">Home</Link>
        </li>
        <li>
          <Link to="/about-us" className="text-black hover:text-blue-500 px-4 py-2">About</Link>
        </li>
        <Menu as="div" className="relative inline-block text-left">
          {({ open }) => (
            <>
              <Menu.Button
                aria-haspopup="true"
                aria-expanded={open}
                className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-gray-200 text-sm font-medium text-black hover:text-blue-500"
              >
                Courses
              </Menu.Button>
              {open && (
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/courses/full-stack-developer"
                          className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-blue-500' : 'text-gray-700'} `}
                        >
                          Full Stack Developer Course
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/courses/aws-cloud-practitioner"
                          className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-blue-500' : 'text-gray-700'} `}
                        >
                          AWS Cloud Practitioner
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/courses/devops-bootcamp"
                          className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-blue-500' : 'text-gray-700'} `}
                        >
                          DevOps Bootcamp
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              )}
            </>
          )}
        </Menu>
        <li>
          <Link to="/workshops" className="text-black hover:text-blue-500 px-4 py-2">Workshops</Link>
        </li>
        <li>
          <Link to="/blogs" className="text-black hover:text-blue-500 px-4 py-2">Blogs</Link>
        </li>
        <Menu as="div" className="relative inline-block text-left">
          {({ open }) => (
            <>
              <Menu.Button
                aria-haspopup="true"
                aria-expanded={open}
                className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-gray-200 text-sm font-medium text-black hover:text-blue-500"
              >
                Contact
              </Menu.Button>
              {open && (
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/contact-us"
                          className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-blue-500' : 'text-gray-700'} `}
                        >
                          Contact Us
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/faqs"
                          className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-blue-500' : 'text-gray-700'} `}
                        >
                          FAQ's
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              )}
            </>
          )}
        </Menu>
        <li>
          <Link to="/login" className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600">Login</Link>
        </li>
        {/* <li>
          <Link to="/Batchlist" className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600">batch_list</Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar1;
