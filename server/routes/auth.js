const express = require("express");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const pool = require("../utils/db");
const jwt = require("jsonwebtoken");
const transporter = require("../utils/email");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      companyName,
      email,
      phone,
      password
    } = req.body;

    const existingUser = await pool.query(
      'SELECT id FROM mc."users" WHERE email = $1',
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const verificationToken = uuidv4();

    await pool.query(
      `
      INSERT INTO mc."users"
      (
        first_name,
        last_name,
        company_name,
        email,
        password_hash,
        verification_token
      )
      VALUES
      ($1,$2,$3,$4,$5,$6)
      `,
      [
        firstName,
        lastName,
        companyName,
        email,
        passwordHash,
        verificationToken
      ]
    );
    const verificationLink = `http://localhost:5173/verify-email/${verificationToken}`;

    await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: "Verify Your Material Cycle Account",
    html: `
        <h2>Welcome to Material Cycle</h2>

        <p>
        Please verify your email address by clicking the button below.
        </p>

        <a
        href="${verificationLink}"
        style="
            background:#16a34a;
            color:white;
            padding:12px 24px;
            text-decoration:none;
            border-radius:8px;
        "
        >
        Verify Email
        </a>
    `
    });
    res.json({
      success: true
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(
      `
      SELECT *
      FROM mc."users"
      WHERE email = $1
      `,
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password_hash
    );

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }
console.log('User: ',user);
    if (!user.rows[0].email_verified) {
      return res.status(401).json({
        message: "Please verify your email address before logging in."
      });
    }

    const token = jwt.sign(
      {
        userId: user.rows[0].id,
        email: user.rows[0].email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.rows[0].id,
        firstName: user.rows[0].first_name,
        lastName: user.rows[0].last_name,
        email: user.rows[0].email
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
});
router.get("/verify-email/:token",async (req, res) => {
    const { token } = req.params;

    const result = await pool.query(
      `
      UPDATE mc."users"
      SET email_verified = true,
          verification_token = null
      WHERE verification_token = $1
      RETURNING *
      `,
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "Invalid verification token"
      });
    }

    res.json({
      success: true
    });
  }
);
router.post("/forgot-password",async (req, res) => {
    try {
      const { email } = req.body;

      const user = await pool.query(
        `
        SELECT *
        FROM mc."users"
        WHERE email = $1
        `,
        [email]
      );

      if (user.rows.length === 0) {
        return res.json({
          success: true
        });
      }

      const token = uuidv4();

      const expiry = new Date(
        Date.now() + 3600000
      ); // 1 hour
      console.log('Token: ',token);
      await pool.query(
        `
        UPDATE mc."users"
        SET
          reset_token = $1,
          reset_token_expiry = $2
        WHERE email = $3
        `,
        [
          token,
          expiry,
          email
        ]
      );

      const resetLink = `http://localhost:5173/reset-password/${token}`;

      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: "Reset Your Password",
        html: `
          <h2>Password Reset</h2>

          <p>
            Click the button below to reset your password.
          </p>

          <a
            href="${resetLink}"
            style="
              background:#16a34a;
              color:white;
              padding:12px 24px;
              text-decoration:none;
              border-radius:8px;
            "
          >
            Reset Password
          </a>
        `
      });

      res.json({
        success: true
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);
router.post("/reset-password/:token",async (req, res) => {
    try {
      const { token } = req.params;
      const { password } = req.body;

      const user =
        await pool.query(
          `
          SELECT *
          FROM mc."users"
          WHERE reset_token = $1
          `,
          [token]
        );
        console.log('User: ',user.rows);
      if (
        user.rows.length === 0
      ) {
        return res.status(400).json({
          message:
            "Invalid token"
        });
      }

      const passwordHash =
        await bcrypt.hash(
          password,
          12
        );

      await pool.query(
        `
        UPDATE mc."users"
        SET
          password_hash = $1,
          reset_token = null,
          reset_token_expiry = null
        WHERE id = $2
        `,
        [
          passwordHash,
          user.rows[0].id
        ]
      );

      res.json({
        success: true
      });

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Server Error"
      });
    }
  }
);

module.exports = router;