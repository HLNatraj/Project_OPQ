const connection = require("../mysql/mysql");
const errorHandler = require("../controller/Errorcontroller");

// Get all workshops
const getWorkshops = (req, res) => {
    const getWorkshopsQuery = 'SELECT * FROM workshops';

    connection.query(getWorkshopsQuery, (err, results) => {
        if (err) {
            errorHandler(err, req, res, 400);
        } else {
            res.set({"Content-Type": "application/json"});
            res.status(200).json(results);
        }
    });
};

// Add a new workshop
const addWorkshop = (req, res) => {
    const { title, agenda, date, time, price, image, link, description } = req.body;
    const query = 'INSERT INTO workshops (title, agenda, date, time, price, image, link, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    connection.query(query, [title, agenda, date, time, price, image, link, description], (err, results) => {
        if (err) {
            errorHandler(err, req, res, 400);
        } else {
            res.set({"Content-Type": "application/json"});
            res.status(201).json({ message: 'Workshop added successfully', workshopId: results.insertId });
        }
    });
};

// Update a workshop
const updateWorkshop = (req, res) => {
    const { id } = req.params;
    const { title, agenda, date, time, price, image, link, description } = req.body;
    const query = 'UPDATE workshops SET title = ?, agenda = ?, date = ?, time = ?, price = ?, image = ?, link = ?, description = ? WHERE id = ?';

    connection.query(query, [title, agenda, date, time, price, image, link, description, id], (err, results) => {
        if (err) {
            errorHandler(err, req, res, 400);
        } else {
            res.set({"Content-Type": "application/json"});
            res.status(200).json({ message: 'Workshop updated successfully' });
        }
    });
};

// Delete a workshop
const deleteWorkshop = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM workshops WHERE id = ?';

    connection.query(query, [id], (err, results) => {
        if (err) {
            errorHandler(err, req, res, 400);
        } else {
            res.set({"Content-Type": "application/json"});
            res.status(200).json({ message: 'Workshop deleted successfully' });
        }
    });
};

module.exports = {
    getWorkshops,
    addWorkshop,
    updateWorkshop,
    deleteWorkshop
};
