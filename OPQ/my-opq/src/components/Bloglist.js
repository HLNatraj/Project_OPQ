import React from 'react';
import { motion } from 'framer-motion';

const blogs = [
  {
    id: 1,
    title: 'Understanding React Hooks',
    excerpt: 'React Hooks are functions that let you use state and other React features without writing a class.',
    image: '/hookss.png',
    date: 'July 25, 2024',
    link: '/blogs/hooks'
  },
  {
    id: 2,
    title: 'Getting Started with Tailwind CSS',
    excerpt: 'Tailwind CSS is a utility-first CSS framework that provides low-level utility classes.',
    image: '/tailwind.png',
    date: 'July 20, 2024',
    link: '/blogs/tailwind'
  },
  {
    id: 3,
    title: 'Mastering JavaScript Promises',
    excerpt: 'Promises are a modern alternative to callbacks for handling asynchronous operations in JavaScript.',
    image: '/promises.png',
    date: 'July 15, 2024',
    link: '/blogs/promises'
  }
];

const Bloglist = () => {
  return (
    <>
      <section
        className="relative bg-cover bg-center text-white py-16 mt-16"
        style={{ backgroundImage: 'url(/blog1.jfif)' }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative container mx-auto text-center z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Learn with OPQ Bootcamp
          </h1>
          <p className="text-lg md:text-xl">
            Enjoy our insights and engage with us!
          </p>
        </div>
      </section>

      <div className="p-6 md:p-12">
        <header className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4 text-blue-700"
          >
            Our Blogs
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-700"
          >
            Stay updated with our latest articles and insights.
          </motion.p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map(blog => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img src={blog.image} alt={blog.title} className="w-full h-48 object-contain" />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">{blog.date}</span>
                  <a
                    href={blog.link}
                    className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Bloglist;
