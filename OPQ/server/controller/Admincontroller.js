const connection = require("../mysql/mysql");
const error_handler = require("../controller/Errorcontroller");

// Get all admins
const getAdmins = (req, res) => {
    const get_admins_query = `SELECT * FROM admins`;

    connection.query(get_admins_query, (err, results) => {
        if (err) {
            error_handler(err, req, res, 400);
        } else {
            res.set({ "Content-Type": "application/json" });
            res.status(200).send(results);
        }
    });
};

// Add a new admin
const addAdmin = (req, res) => {
    const { username, password, email } = req.body;
    const query = 'INSERT INTO admins (username, password, email) VALUES (?, ?, ?)';

    connection.query(query, [username, password, email], (err, results) => {
        if (err) {
            error_handler(err, req, res, 400);
        } else {
            res.set({ "Content-Type": "application/json" });
            res.status(201).send({ message: 'Admin added successfully', adminId: results.insertId });
        }
    });
};

// Update an admin
const updateAdmin = (req, res) => {
    const { id } = req.params;
    const { username, password, email } = req.body;
    const query = 'UPDATE admins SET username = ?, password = ?, email = ? WHERE admin_id = ?';

    connection.query(query, [username, password, email, id], (err, results) => {
        if (err) {
            error_handler(err, req, res, 400);
        } else {
            res.set({ "Content-Type": "application/json" });
            res.status(200).send({ message: 'Admin updated successfully' });
        }
    });
};

// Delete an admin
const deleteAdmin = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM admins WHERE admin_id = ?';

    connection.query(query, [id], (err, results) => {
        if (err) {
            error_handler(err, req, res, 400);
        } else {
            res.set({ "Content-Type": "application/json" });
            res.status(200).send({ message: 'Admin deleted successfully' });
        }
    });
};

module.exports = {
    getAdmins,
    addAdmin,
    updateAdmin,
    deleteAdmin
};
