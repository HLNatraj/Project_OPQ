# Server Setup Guide

This project contains a backend server built using **Node.js**, **Express.js**, and **SQL**.

## 📦 Technologies Used
- **Node.js**
- **Express.js**
- **SQL**

## 🚀 Getting Started

Follow these steps to set up and run the server:

### 1. Clone the Repository

git clone <your-repo-url>
cd <your-server-folder>

2. Install Dependencies
Make sure you have Node.js and npm installed. Then run:
npm install

3. Run the Server
Start the server using the following command:

npx run index.js

🛢️ Database Setup
Create a database named opq1 and run the following table definitions:

CREATE DATABASE opq1;

-- Admin Table
CREATE TABLE admin (
  admin_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255),
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Batches Table
CREATE TABLE batches (
  batch_id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT,
  batch_name VARCHAR(255),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Course Enroll Table
CREATE TABLE course_enroll (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  contact VARCHAR(15),
  city VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  course_name VARCHAR(100)
);

-- Courses Table
CREATE TABLE courses (
  course_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  imageUrl VARCHAR(255),
  link VARCHAR(255)
);

-- Quick Responses Table
CREATE TABLE quick_responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  contact VARCHAR(15),
  message TEXT,
  recaptcha_response TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skills Table
CREATE TABLE skills (
  skill_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Students Table
CREATE TABLE students (
  student_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  phone_number VARCHAR(20),
  course_id INT,
  batch_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Workshops Table
CREATE TABLE workshops (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  agenda TEXT,
  date DATE,
  time VARCHAR(50),
  price DECIMAL(10,2),
  image VARCHAR(255),
  link VARCHAR(255),
  description TEXT
);

📌 Notes
Ensure your SQL server is running and accessible with the credentials in .env.

You can use tools like Postman to test API routes once the server is up.

All timestamps are set to auto-generate and update with row changes.

🤝 Contribution
Feel free to fork the repo, submit issues, or create pull requests to contribute to this project.

