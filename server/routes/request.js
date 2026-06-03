const express = require("express");
const nodemailer = require("nodemailer");
const pool = require("../utils/db");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      fullName,
      companyName,
      email,
      phone,
      service,
      location,
      message
    } = req.body;

    await pool.query(
      `
      INSERT INTO consultation_requests
      (
          full_name,
          company_name,
          email,
          phone,
          service_required,
          message
      )
      VALUES
      ($1,$2,$3,$4,$5,$6)
      `,
      [
          fullName,
          companyName,
          email,
          phone,
          service,
          message
      ]
    );

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: "NcedoM@ebuhlantidevs.co.za,grootboomunathi@gmail.com",
      subject: "Material Cycle Consultation Request",
      html: `
        <h2>New Consultation Request</h2>

        <p><b>Full Name:</b> ${fullName}</p>
        <p><b>Company:</b> ${companyName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Service:</b> ${service}</p>
        <p><b>Location:</b> ${location}</p>

        <hr/>

        <p><b>Requirements:</b></p>
        <p>${message}</p>
      `
    });

    res.json({
      success: true
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false
    });
  }
});

module.exports = router;