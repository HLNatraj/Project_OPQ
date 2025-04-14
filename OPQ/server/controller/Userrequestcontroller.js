const connection = require("../mysql/mysql");
const error_handler = require("../controller/Errorcontroller");

// Get all quick responses
const getQuickResponses = (req, res) => {
    const get_quick_responses_query = `SELECT * FROM quick_responses`;

    connection.query(get_quick_responses_query, (err, results) => {
        if (err) {
            error_handler(err, req, res, 400);
        } else {
            res.set({"Content-Type": "application/json"});
            res.status(200).send(results);
        }
    });
};

// Delete a quick response
const deleteQuickResponse = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM quick_responses WHERE id = ?';

    connection.query(query, [id], (err, results) => {
        if (err) {
            error_handler(err, req, res, 400);
        } else {
            res.set({"Content-Type": "application/json"});
            res.status(200).send({ message: 'Quick response deleted successfully' });
        }
    });
};

module.exports = {
    getQuickResponses,
    deleteQuickResponse
};
