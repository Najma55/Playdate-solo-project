const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");

const router = express.Router();

// Create non-repeating event. Reeive values address, image, name, and non-repeating-dates.
router.post("/create-event", (req, res, next) => {
  const queryText = `INSERT INTO "event" (address, image, name, non-repeating-dates)
    VALUES ($1, $2, $3, $4) RETURNING id`;
  pool
    .query(queryText, [
      req.body.address,
      req.body.image,
      req.body.name,
      req.body.non - repeating - dates,
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("Create non-repeating failed: ", err);
      res.sendStatus(500);
    });
});

// Update event. Expect event-ID in req.params and the fields to be edited in the req.body.
router.put("/:eventid", (req, res) => {
  let eventid = req.params.eventid;

  const queryText = `
  UPDATE "event"
SET
  "name" = $1,
  "image" = $2,
  "address" = $3,
  "non-repeating-dates" = $4,
WHERE "id" = $5
  `;

  pool
    .query(queryText, [
      req.body.name,
      req.body.image,
      req.body.address,
      req.body.non - repeating - dates,
      eventid,
    ])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500);
    });
});
// Delete event. Expect event-ID in req.params.
router.delete("/:eventid", (req, res) => {
  let eventid = req.params.eventid;

  const queryText = `
  DELETE FROM "event" WHERE "id" = $1;
  `;

  pool
    .query(queryText, [eventid])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500);
    });
});

// Book event. Expect event-ID in the params and user-ID in the req.body.
router.post("/book/:eventid", (req, res) => {
  let eventid = req.params.eventid;

  const queryText = `
  UPDATE "event"
SET
  "name" = $1,
  "image" = $2,
  "address" = $3,
  "non-repeating-dates" = $4,
WHERE "id" = $5
  `;

  pool
    .query(queryText, [
      req.body.name,
      req.body.image,
      req.body.address,
      req.body.non - repeating - dates,
      eventid,
    ])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500);
    });
});

// Get invite details. Expect event-ID in the req.params.

// Accept invite. Expect event-ID in the req.params and user-ID in the req.body.

// Get event details. Expect event-ID in the req.params.

module.exports = router;
