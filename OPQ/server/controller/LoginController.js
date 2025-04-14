const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const connection = require("F:/mern/React/OPQ/server/mysql/mysql");
const errorHandler = require("./Errorcontroller");

// Load environment variables from .env file
dotenv.config();

const LoginController = (req, res) => {
    const { username, password } = req.body;

    const loginQuery = `
        SELECT * FROM admins WHERE username = ?
    `;

    connection.query(loginQuery, [username], (err, results) => {
        if (err) {
            return errorHandler(res, err); 
        }

        if (results.length > 0) {
            const user = results[0];

            // Compare password (assuming plaintext for simplicity)
            // Replace this with hashed password comparison in production
            const isMatch = (password === user.password);

            if (isMatch) {
                const payload = {
                    username: user.username,
                    user_id: user.user_id
                };

                // Create the JWT token
                const Token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

                // Send the token in the response
                res.status(200).json({
                    message: "Login successful",
                    user_id: user.user_id,
                    token: Token
                });
            } else {
                res.status(401).json({ message: "Invalid username or password" });
            }
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    });
};

module.exports = LoginController;
