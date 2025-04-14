const connection = require("../mysql/mysql");
const error_handler = require("../controller/Errorcontroller");

// Get all students
const getstudents = (req, res) => {
    const get_students_query = `SELECT 
    students.student_id,
    students.first_name,
    students.last_name,
    students.email,
    students.phone_number,
    courses.title AS course_name,
    batches.batch_name AS batch_name,
    students.created_at,
    students.updated_at
FROM students
JOIN courses ON students.course_id = courses.course_id
JOIN batches ON students.batch_id = batches.batch_id;`;

    connection.query(get_students_query, (err, results) => {
        if (err) {
            error_handler(err, req, res, 400);
        } else {
            res.set({"Content-Type": "application/json"});
            res.status(200).send(results);
        }
    });
};

// Add a new student
const addstudent = (req, res) => {
    const { first_name, last_name, email, phone_number, course_id, batch_id } = req.body;
    const insert_query = 'INSERT INTO students (first_name, last_name, email, phone_number, course_id, batch_id) VALUES (?, ?, ?, ?, ?, ?)';

    connection.query(insert_query, [first_name, last_name, email, phone_number, course_id, batch_id], (err, results) => {
        if (err) {
            error_handler(err, req, res, 400);
        } else {
            const studentId = results.insertId;
            const get_student_query = `
            SELECT 
                students.student_id,
                students.first_name,
                students.last_name,
                students.email,
                students.phone_number,
                courses.title AS course_name,
                batches.batch_name AS batch_name,
                students.created_at,
                students.updated_at
            FROM students
            JOIN courses ON students.course_id = courses.course_id
            JOIN batches ON students.batch_id = batches.batch_id
            WHERE students.student_id = ?`;

            connection.query(get_student_query, [studentId], (err, results) => {
                if (err) {
                    error_handler(err, req, res, 400);
                } else {
                    res.set({"Content-Type": "application/json"});
                    res.status(201).send({ message: 'Student added successfully', student: results[0] });
                }
            });
        }
    });
};

// Update a student
const updatestudent = (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, phone_number, course_id, batch_id } = req.body;
    const query = 'UPDATE students SET first_name = ?, last_name = ?, email = ?, phone_number = ?, course_id = ?, batch_id = ? WHERE student_id = ?';

    connection.query(query, [first_name, last_name, email, phone_number, course_id, batch_id, id], (err, results) => {
        if (err) {
            error_handler(err, req, res, 400);
        } else {
            res.set({"Content-Type": "application/json"});
            res.status(200).send({ message: 'Student updated successfully' });
        }
    });
};

// Delete a student
const deletestudent = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM students WHERE student_id = ?';

    connection.query(query, [id], (err, results) => {
        if (err) {
            error_handler(err, req, res, 400);
        } else {
            res.set({"Content-Type": "application/json"});
            res.status(200).send({ message: 'Student deleted successfully' });
        }
    });
};

module.exports = {
    getstudents,
    addstudent,
    updatestudent,
    deletestudent
};
