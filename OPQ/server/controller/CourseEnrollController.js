const express = require("express");
const fetch = require("node-fetch");
const nodemailer = require("nodemailer"); // Import Nodemailer
const connection = require("F:/mern/React/OPQ/server/mysql/mysql");
const error_handler = require("./Errorcontroller");

const RECAPTCHA_SECRET_KEY = '6LfL7SMqAAAAAF5CcOwXQdRXIuNErYi4MZGW3pfo'; // Replace with your reCAPTCHA secret key

// Nodemailer setup for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service (e.g., Gmail, SendGrid, etc.)
    auth: {
        user: 'bnsunil441@gmail.com', // Your email address
        pass: 'ivri aduu azvq kfaq', // Your email password or app-specific password
    },
});

const CourseEnroll = async (req, res) => {
    const { name, email, contact, city, captchaToken, course_name } = req.body;

    if (!name || !email || !contact || !city || !captchaToken) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // Verify reCAPTCHA
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify`;
    const verificationParams = new URLSearchParams({
        secret: RECAPTCHA_SECRET_KEY,
        response: captchaToken,
    });

    try {
        const response = await fetch(verificationURL, {
            method: 'POST',
            body: verificationParams,
        });
        const data = await response.json();

        if (!data.success) {
            return res.status(400).json({ message: "Invalid CAPTCHA. Please try again." });
        }

        // CAPTCHA verified successfully, proceed with enrollment
        const create_enrollment_query = `
            INSERT INTO course_enroll (name, email, contact, city, course_name)
            VALUES (?, ?, ?, ?, ?)
        `;
        connection.query(create_enrollment_query, [name, email, contact, city, course_name], function(err, results) {
            if (err) {
                error_handler(err, req, res, 400);
            } else {
                // Enrollment created successfully

                // Email content to send to the user
                const mailOptions = {
                    from: 'bnsunil441@gmail.com', // Sender address
                    to: email, // Receiver's email address
                    subject: `Course Enrollment Confirmation - ${course_name}`,
                    text: `Dear ${name},\n\nThank you for enrolling to ${course_name}..!! We are excited to have you on board.\n\nBest regards,\nOPQ Bootcamp`,
                };

                // Send the email
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Error sending email:', error);
                        return res.status(500).json({ message: 'Enrollment was successful, but we could not send the confirmation email.' });
                    } else {
                        console.log('Email sent:', info.response);
                        res.set({ "Content-Type": "application/json" });
                        res.status(201).send({ message: "Enrollment created successfully, and confirmation email sent!" });
                    }
                });
            }
        });
    } catch (error) {
        console.error("Error verifying CAPTCHA:", error);
        res.status(500).json({ message: "An error occurred while verifying the CAPTCHA." });
    }
};

module.exports = CourseEnroll;
