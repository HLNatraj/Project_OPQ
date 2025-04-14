import React from 'react';

const courses = [
  {
    title: 'Full Stack Developer Course',
    description: 'Full Stack Developer Course helps you to master in the React JS, Express, Node.js, Mongo DB, and Python',
    imageUrl: '/fullstack.webp',
    link: '/courses/full-stack-developer',
  },
  {
    title: 'AWS Cloud Practitioner',
    description: 'The Amazon Web Services AWS Cloud and the world\'s basic infrastructure.',
    imageUrl: '/aws.png',
    link: '/courses/aws-cloud-practitioner',
  },
  {
    title: 'Devops Bootcamp',
    description: 'DevOps bootcamp teaches you about AWS cloud, deployments, CI/CD pipeline and Git.',
    imageUrl: '/devops.png',
    link: '/courses/devops-bootcamp',
  },
];

const CourseCard = ({ title, description, imageUrl, link }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
    <a href={link}>
      <img src={imageUrl} alt={title} className="w-full h-48 object-contain" />
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

const Courses = () => (
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
            key={course.title}
            title={course.title}
            description={course.description}
            imageUrl={course.imageUrl}
            link={course.link}
          />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <a href="/courses1" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          View All Courses
        </a>
      </div>
    </div>
  </section>
);

export default Courses;
