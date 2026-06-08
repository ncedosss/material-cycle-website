const express = require("express");
const pool = require("../utils/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/summary", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log("User ID from token:", req.user);
    const pendingRequests = await pool.query(`
      SELECT COUNT(*)
      FROM service_requests
      WHERE status = 'Pending'
      AND customer_id = $1
    `,[userId]);
    const approvedRequests = await pool.query(`
      SELECT COUNT(*)
      FROM service_requests
      WHERE status = 'Approved'
      AND customer_id = $1
    `,[userId]);
    const manifestsCreated = await pool.query(`
      SELECT COUNT(*)
      FROM manifests m
      JOIN mc."users" u ON u.id = m.customer_id
      WHERE u.id = $1
    `,[userId]);

    const recentRequests = await pool.query(`
      SELECT
        request_number,
        waste_type,
        status,
        created_at
      FROM service_requests
      WHERE customer_id = $1
      ORDER BY created_at DESC
      LIMIT 5
    `,[userId]);
    
    res.json({
      pendingRequests:
        Number(pendingRequests.rows[0].count),

      approvedRequests:
        Number(approvedRequests.rows[0].count),

      manifestsCreated:
        Number(manifestsCreated.rows[0].count),

      recentRequests:
        recentRequests.rows
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

module.exports = router;