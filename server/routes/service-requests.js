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
        TO_CHAR(sr.eta, 'HH24:MI') AS eta_time,
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'item_key', ci.item_key,
            'result',   ci.result,
            'comment',  ci.comment
          )
        ) FILTER (WHERE ci.id IS NOT NULL) AS checklist_items,
        COALESCE(
          (SELECT JSON_AGG(
                    JSON_BUILD_OBJECT(
                      'line_no',     w.line_no,
                      'description', w.description,
                      'volume',      w.volume
                    ) ORDER BY w.line_no)
             FROM service_request_waste_streams w
            WHERE w.service_request_id = sr.id),
          '[]'::json
        ) AS waste_streams
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
        SELECT
          sr.*,
          TO_CHAR(sr.eta, 'HH24:MI') AS eta_time,
          COALESCE(
            (SELECT JSON_AGG(
                      JSON_BUILD_OBJECT(
                        'item_key', ci.item_key,
                        'result',   ci.result,
                        'comment',  ci.comment
                      ))
               FROM service_request_checklist_items ci
              WHERE ci.service_request_id = sr.id),
            '[]'::json
          ) AS checklist_items,
          COALESCE(
            (SELECT JSON_AGG(
                      JSON_BUILD_OBJECT(
                        'line_no',     w.line_no,
                        'description', w.description,
                        'volume',      w.volume
                      ) ORDER BY w.line_no)
               FROM service_request_waste_streams w
              WHERE w.service_request_id = sr.id),
            '[]'::json
          ) AS waste_streams
        FROM service_requests sr
        WHERE sr.id = $1
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
      generatorName, deliveryOrCollection, requestDate, poReferenceNumber,
      msdsAttached, sampleRequired, compatibilityRequired, specialInstructions,
      wasteStreams, customerName,
      contactNumber,
      vehicleRegistration,
      driverName,
      wirNumber,
      wasteType,
      wasteForm,
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
          'Pending',
          NOW(),
          $9,
          $10,
          $11,
          $12,
          $13,
          $14
        )
        RETURNING *
        `,
        [
          userId,
          requestNumber,
          wasteType,
          wasteForm,
          disposalReason,
          signature,
          declarationDate,
          toTimestamp(requestDate, eta),
          customerName,
          contactNumber,
          vehicleRegistration,
          driverName,
          wirNumber,
          msdsDocument
        ]
      );

    const newId = result.rows[0].id;

    await pool.query(
      `UPDATE service_requests SET
        generator_name = $1, delivery_or_collection = $2, request_date = $3,
        po_reference_number = $4, msds_attached = $5, sample_required = $6,
        compatibility_required = $7, special_instructions = $8
      WHERE id = $9`,
      [generatorName, deliveryOrCollection, requestDate || null, poReferenceNumber,
      msdsAttached === "Yes", sampleRequired === "Yes",
      compatibilityRequired === "Yes", specialInstructions, newId]
    );

    const lines = JSON.parse(wasteStreams || "[]");
    for (let i = 0; i < lines.length; i++) {
      const { description = "", volume = "" } = lines[i] || {};
      if (!description.trim() && !volume.trim()) continue;
      await pool.query(
        `INSERT INTO service_request_waste_streams
          (service_request_id, line_no, description, volume)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (service_request_id, line_no)
        DO UPDATE SET description = EXCLUDED.description, volume = EXCLUDED.volume`,
        [newId, i + 1, description, volume]
      );
    }

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
// <input type="time"> yields "HH:mm"; the eta column is a timestamp,
// so anchor the time to the form's Date row.
const toTimestamp = (dateStr, timeStr) => {
  if (!timeStr) return null;
  const day = dateStr || new Date().toISOString().split("T")[0];
  const time = timeStr.length === 5 ? `${timeStr}:00` : timeStr;
  return `${day} ${time}`;
};

module.exports = router;