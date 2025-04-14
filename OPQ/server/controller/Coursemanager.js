const express = require("express");
const connection = require("../mysql/mysql");
const error_handler = require("../controller/Errorcontroller");
const util = require("util");

// Utility function to format dates
const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
};

// Convert connection.query to use promises
const query = util.promisify(connection.query).bind(connection);

// Get all courses
const getcourses = (req, res) => {
    const get_courses_query = `
        SELECT * FROM courses
    `;

    connection.query(get_courses_query, function(err, results) {
        if (err) {
            error_handler(err, req, res, 400);
        } else {
            res.set({"Content-Type": "application/json"});
            res.statusCode = 200;
            res.send(results);
        }
    });
};

// Update a course
const updatecourse = async (req, res) => {
    const { id } = req.params;
    const { title, description, link, imageUrl } = req.body;
    const start_date = formatDate(req.body.start_date); // Format the start date
    const end_date = formatDate(req.body.end_date);     // Format the end date

    const sql = `
        UPDATE courses 
        SET title = ?, description = ?, start_date = ?, end_date = ?, link = ?, imageUrl = ? 
        WHERE course_id = ?
    `;
    try {
        await query(sql, [title, description, start_date, end_date, link, imageUrl, id]);
        res.status(200).json({ message: 'Course updated successfully' });
    } catch (err) {
        error_handler(err, req, res, 400);
    }
};

// Add a new course
const addcourse = async (req, res) => {
    const { title, description, link, imageUrl } = req.body;
    const start_date = formatDate(req.body.start_date); // Format the start date
    const end_date = formatDate(req.body.end_date);     // Format the end date

    const sql = `
        INSERT INTO courses (title, description, start_date, end_date, link, imageUrl) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    try {
        const results = await query(sql, [title, description, start_date, end_date, link, imageUrl]);
        res.status(201).json({ message: 'Course added successfully', courseId: results.insertId });
    } catch (err) {
        error_handler(err, req, res, 400);
    }
};

// Delete a course
const deletecourse = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM courses WHERE course_id = ?';
    connection.query(sql, [id], (err, results) => {
        if (err) {
            error_handler(err, req, res, 400);
        } else {
            res.set({ 'Content-Type': 'application/json' });
            res.status(200).send({ message: 'Course deleted successfully' });
        }
    });
};

module.exports = {
    getcourses,
    updatecourse,
    addcourse,
    deletecourse
};
