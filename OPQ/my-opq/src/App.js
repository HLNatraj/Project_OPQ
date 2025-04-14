import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './components/Mainlayout'; // Ensure correct import path
import AdminLayout from './components/admin/Adminlayout'; // Ensure correct import path
import Aboutus from './components/Aboutus';
import Fullstack from './components/Fullstack';
import Awscloud from './components/Awscloud';
import Devops from './components/Devops';
import Workshop from './components/Workshop';
import Bloglist from './components/Bloglist';
import Contact from './components/Contact';
import Faq from './components/Faq';
import Login from './components/Login';
import MainPage from './components/Mainpage';
import Courselist from './components/admin/Courselist';
import Batchlist from './components/admin/Batchlist';
import Workshoplist from './components/admin/Workshoplist';
import Studentlist from './components/admin/Studentlist';
import Skill from './components/admin/Skill';
import Admin from './components/admin/Admin';
import Admindashboard from './components/admin/Admindashboard';
import Quickresponselist from './components/admin/Quickresponselist';
import Hooks from './components/Hooks';
import Tailwind from './components/Tailwind';
import Promises from './components/Promises';
import Courses from './components/Courses';
import Courses1 from './components/Courses1';


const App = () => {
  return (
    <Router>
      <Routes>
      
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/about-us" element={<Aboutus />} />
                <Route path="/courses/full-stack-developer" element={<Fullstack />} />
                <Route path="/courses/aws-cloud-practitioner" element={<Awscloud />} />
                <Route path="/courses/devops-bootcamp" element={<Devops />} />
                <Route path="/workshops" element={<Workshop />} />
                <Route path="/blogs" element={<Bloglist />} />
                <Route path="/contact-us" element={<Contact />} />
                <Route path="/faqs" element={<Faq />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Login  />} />
                <Route path="/blogs/hooks" element={<Hooks />} />
                <Route path="/blogs/tailwind" element={<Tailwind />} />
                <Route path="/blogs/promises" element={<Promises/>} />
                <Route path="/courses" element={<Courses/>} />
                <Route path="/courses1" element={<Courses1/>} />
              </Routes>
            </MainLayout>
          }
        />
        <Route
          path="/admin/*"
          element={
            <AdminLayout>
              <Routes>
                <Route path="courses" element={<Courselist />} />
                <Route path="batches" element={<Batchlist />} />
                <Route path="Workshoplist" element={<Workshoplist />} />
                <Route path="Students" element={<Studentlist />} />
                <Route path="Skill" element={<Skill />} />
                <Route path="admin" element={<Admin />} />
                <Route path="admindashboard" element={<Admindashboard />} />
                <Route path="userrequest" element={<Quickresponselist />} />
              </Routes>
            </AdminLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
