const express = require('express');
const fetch = require('node-fetch');
const connection = require('../mysql/mysql'); // Adjust the path as needed
const error_handler = require('./Errorcontroller');

const RECAPTCHA_SECRET_KEY = '6LfL7SMqAAAAAF5CcOwXQdRXIuNErYi4MZGW3pfo'; // Replace with your reCAPTCHA secret key

const Quickresponsecontroller = async (req, res) => {
  const { name, email, contact, message, recaptcha } = req.body;

  if (!name || !email || !contact || !message || !recaptcha) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Verify reCAPTCHA
  const verificationURL = `https://www.google.com/recaptcha/api/siteverify`;
  const verificationParams = new URLSearchParams({
    secret: RECAPTCHA_SECRET_KEY,
    response: recaptcha,
  });

  try {
    const captchaResponse = await fetch(verificationURL, {
      method: 'POST',
      body: verificationParams,
    });
    const captchaData = await captchaResponse.json();

    if (!captchaData.success) {
      return res.status(400).json({ message: 'Invalid CAPTCHA. Please try again.' });
    }

    // CAPTCHA verified successfully, proceed with form processing
    const createContactQuery = `
      INSERT INTO quick_responses (name, email, contact, message, recaptcha_response)
      VALUES (?, ?, ?, ?, ?)
    `;

    connection.query(createContactQuery, [name, email, contact, message, recaptcha], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return error_handler(err, req, res, 500);
      }

      res.status(201).json({ message: 'Message sent successfully.' });
    });
  } catch (error) {
    console.error('Error verifying CAPTCHA:', error);
    res.status(500).json({ message: 'An error occurred while verifying the CAPTCHA.' });
  }
};

module.exports = Quickresponsecontroller;
