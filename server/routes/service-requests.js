const express = require("express");
const pool = require("../utils/db");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const {
      search,
      status
    } = req.query;

    let sql = `
      SELECT *
      FROM service_requests
      WHERE customer_id = $1
    `;

    const params = [userId];

    if (search) {

      params.push(
        `%${search}%`
      );

      sql += `
        AND request_number ILIKE
        $${params.length}
      `;
    }

    if (status) {

      params.push(status);

      sql += `
        AND status =
        $${params.length}
      `;
    }

    sql += `
      ORDER BY created_at DESC
    `;

    const result =
      await pool.query(
        sql,
        params
      );

    res.json(
      result.rows
    );

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
});
router.get("/admin", authMiddleware, async (req, res) => {
  try {
    const { search, status } = req.query;
    const params = [];
    const conditions = [];

    if (search) {
      params.push(`%${search}%`);
      conditions.push(`sr.request_number ILIKE $${params.length}`);
    }

    if (status) {
      params.push(status);
      conditions.push(`sr.status = $${params.length}`);
    }

    const whereClause = conditions.length > 0
      ? `WHERE ${conditions.join(' AND ')}`
      : '';

    const sql = `
      SELECT
        sr.*,
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'item_key', ci.item_key,
            'result',   ci.result,
            'comment',  ci.comment
          )
        ) FILTER (WHERE ci.id IS NOT NULL) AS checklist_items
      FROM service_requests sr
      LEFT JOIN service_request_checklist_items ci ON ci.service_request_id = sr.id
      ${whereClause}
      GROUP BY sr.id
      ORDER BY sr.created_at DESC
    `;

    const result = await pool.query(sql, params);
    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const request =
      await pool.query(
        `
        SELECT *
        FROM service_requests
        WHERE id = $1
        `,
        [id]
      );

    if (
      request.rows.length === 0
    ) {
      return res
        .status(404)
        .json({
          message:
            "Request not found"
        });
    }

    res.json(
      request.rows[0]
    );

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Server Error"
    });
  }
});
router.post("/", authMiddleware, upload.single("msdsFile"), async (req, res) => {
  try {

    const userId = req.user.userId;

    const msdsDocument = req.file ? req.file.path : null;

    const {
      customerName,
      contactNumber,
      vehicleRegistration,
      driverName,
      wirNumber,
      wasteType,
      wasteForm,
      volume,
      disposalReason,
      signature,
      declarationDate,
      eta
    } = req.body;

    const requestNumber =
      `SR-${Date.now()}`;

    const result =
      await pool.query(
        `
        INSERT INTO service_requests
        (
          customer_id,
          request_number,
          waste_type,
          waste_form,
          volume,
          disposal_reason,
          signature,
          declaration_date,
          eta,
          status,
          created_at,
          customer_name,
          contact_number,
          vehicle_registration,
          driver_name,
          wir_number,
          msds_document
        )
        VALUES
        (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
          $9,
          'Pending',
          NOW(),
          $10,
          $11,
          $12,
          $13,
          $14,
          $15
        )
        RETURNING *
        `,
        [
          userId,
          requestNumber,
          wasteType,
          wasteForm,
          volume,
          disposalReason,
          signature,
          declarationDate,
          eta,
          customerName,
          contactNumber,
          vehicleRegistration,
          driverName,
          wirNumber,
          msdsDocument
        ]
      );

    res.status(201).json(
      result.rows[0]
    );

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
});

module.exports = router;