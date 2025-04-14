const connection = require("../mysql/mysql");
const error_handler = require("../controller/Errorcontroller");

// Get all skills
const getSkills = (req, res) => {
    const get_skills_query = `SELECT * FROM skills`;

    connection.query(get_skills_query, (err, results) => {
        if (err) {
            error_handler(err, req, res, 400);
        } else {
            res.set({ "Content-Type": "application/json" });
            res.status(200).send(results);
        }
    });
};

// Add a new skill
const addSkill = (req, res) => {
    const { name } = req.body;
    const query = 'INSERT INTO skills (name) VALUES (?)';

    connection.query(query, [name], (err, results) => {
        if (err) {
            error_handler(err, req, res, 400);
        } else {
            res.set({ "Content-Type": "application/json" });
            res.status(201).send({ message: 'Skill added successfully', skillId: results.insertId });
        }
    });
};

// Update a skill
const updateSkill = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const query = 'UPDATE skills SET name = ? WHERE skill_id = ?';

    connection.query(query, [name, id], (err, results) => {
        if (err) {
            error_handler(err, req, res, 400);
        } else {
            res.set({ "Content-Type": "application/json" });
            res.status(200).send({ message: 'Skill updated successfully' });
        }
    });
};

// Delete a skill
const deleteSkill = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM skills WHERE skill_id = ?';

    connection.query(query, [id], (err, results) => {
        if (err) {
            error_handler(err, req, res, 400);
        } else {
            res.set({ "Content-Type": "application/json" });
            res.status(200).send({ message: 'Skill deleted successfully' });
        }
    });
};

module.exports = {
    getSkills,
    addSkill,
    updateSkill,
    deleteSkill
};
