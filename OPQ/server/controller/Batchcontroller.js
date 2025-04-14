const express = require("express");
const connection = require("../mysql/mysql");
const error_handler = require("../controller/Errorcontroller");

// Get all batches
const getbatches = (req, res) => {
    const get_batches_query = `
        SELECT * FROM batches
    `;

    connection.query(get_batches_query, (err, results) => {
        if (err) {
            error_handler(err, req, res, 400);
        } else {
            res.set({ "Content-Type": "application/json" });
            res.status(200).send(results);
        }
    });
};

// Update a batch
const updatebatch = (req, res) => {
    const { id } = req.params;
    const { batch_name, start_date, end_date, course_id } = req.body;
    const query = 'UPDATE batches SET batch_name = ?, start_date = ?, end_date = ?, course_id = ? WHERE batch_id = ?';
    connection.query(query, [batch_name, start_date, end_date, course_id, id], (err, results) => {
        if (err) {
            error_handler(err, req, res, 400);
        } else {
            res.set({ 'Content-Type': 'application/json' });
            res.status(200).send({ message: 'Batch updated successfully' });
        }
    });
};

// Add a new batch
const addbatch = (req, res) => {
    const { course_id, batch_name, start_date, end_date } = req.body;
    const query = 'INSERT INTO batches (course_id, batch_name, start_date, end_date) VALUES (?, ?, ?, ?)';

    connection.query(query, [course_id, batch_name, start_date, end_date], (err, results) => {
        if (err) {
            error_handler(err, req, res, 400);
        } else {
            res.set({ 'Content-Type': 'application/json' });
            res.status(201).send({ message: 'Batch added successfully', batchId: results.insertId });
        }
    });
};

// Delete a batch
const deletebatch = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM batches WHERE batch_id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            error_handler(err, req, res, 400);
        } else {
            res.set({ 'Content-Type': 'application/json' });
            res.status(200).send({ message: 'Batch deleted successfully' });
        }
    });
};

module.exports = {
    getbatches,
    updatebatch,
    addbatch,
    deletebatch
};
