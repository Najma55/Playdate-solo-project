const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");

const router = express.Router();

// Create non-repeating event. Reeive values address, image, name, and non-repeating-dates.
router.post("/create-event", rejectUnauthenticated, (req, res, next) => {
  if (
    !req.body.address ||
    !req.body.image ||
    !req.body.name ||
    !req.body.nonRepeatingDates
  ) {
    return res.status(400).send("missing field");
  }
  // Check if the logged in user is an Admin.
  if (req.user.role !== "admin") {
    return res.status(403).send("Unauthorized");
  }
  const queryText = `INSERT INTO "event" ("address", "image", "name", "non-repeating-dates", "event-type")
    VALUES ($1, $2, $3, $4, $5) RETURNING id`;
  pool
    .query(queryText, [
      req.body.address,
      req.body.image,
      req.body.name,
      req.body.nonRepeatingDates,
      "non-repeating",
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("Create non-repeating failed: ", err);
      res.sendStatus(500);
    });
});

// Update event. Expect event-ID in req.params and the fields to be edited in the req.body.
router.put("/:eventid", rejectUnauthenticated, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).send("Unauthorized");
  }
  let eventid = req.params.eventid;

  const queryText = `
  UPDATE "event"
SET
  "name" = $1,
  "image" = $2,
  "address" = $3,
  "non-repeating-dates" = $4
WHERE "id" = $5
  `;

  pool
    .query(queryText, [
      req.body.name,
      req.body.image,
      req.body.address,
      req.body.nonRepeatingDates,
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
router.delete("/:eventid", rejectUnauthenticated, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).send("Unauthorized");
  }
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

function generateUniqueCode() {
  const characters =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let code;

  code = "";
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
}

// Book event. Expect event-ID in the params and user-ID in the req.body.
router.post("/book/:eventid", rejectUnauthenticated, (req, res) => {
  if (!req.body.userID) {
    return res.status(400).send("missing field");
  }
  let eventid = req.params.eventid;
  const invitelink = generateUniqueCode();
  const queryText = `
  INSERT INTO "booking" ("user-id", "event-id", "invite-link", "going_dates")
VALUES ( $1, $2, $3, $4) RETURNING "invite-link";
  `;

  pool
    .query(queryText, [req.body.userID, eventid, invitelink, req.body.going_dates])
    .then((result) => {
      console.log(result);
      res.status(201).json(result.rows[0]);
    })
    .catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500);
    });
});

// Get invite details. Expect invite code in the req.params.
router.get("/invite/:invitecode", (req, res) => {
  let invitecode = req.params.invitecode;

  const queryText = `
  SELECT "user"."name" AS "parentName", "event"."name" AS "eventName", "address", "non-repeating-dates", "invite-link", "user"."id" AS "userid", "event"."id" AS "eventid", "booking"."going_dates" FROM "booking" JOIN "user" ON "user"."id" = "booking"."user-id" JOIN "event" ON "event"."id" = "booking"."event-id" WHERE "invite-link" = $1;
  `;

  pool
    .query(queryText, [invitecode])
    .then((result) => {
      res.status(200).json(result.rows[0]);
    })
    .catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500);
    });
});

// Accept invite. Expect event-ID in the req.params and user-ID in the req.body.
router.post("/accept/:invitecode", rejectUnauthenticated, (req, res) => {
  //We first start by getting the invite details by using the invite code. 
  const queryGetInvite = `
  SELECT "user"."name" AS "parentName", "event"."name" AS "eventName", "address", "non-repeating-dates", "invite-link", "user"."id" AS "userid", "event"."id" AS "eventid", "booking"."going_dates" FROM "booking" JOIN "user" ON "user"."id" = "booking"."user-id" JOIN "event" ON "event"."id" = "booking"."event-id" WHERE "invite-link" = $1;
  `;

  pool
    .query(queryGetInvite, [req.params.invitecode])
    .then((result) => {
      // At this point, we have the invite details as result.rows[0]
      let eventid = result.rows[0].eventid;
      // With the invite details we create an invitee record
      const queryText = `
      INSERT INTO "invitee" ("parent-id", "invited-parent-id","event-id")
    VALUES ( $1, $2, $3);
      `;
    
      pool
        .query(queryText, [result.rows[0].userid, req.user.id, eventid])
        .then((result) => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log(`Error making query ${queryText}`, err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log(`Error making query`, err);
      res.sendStatus(500);
    });
  
});
// Get event details. Expect event-ID in the req.params.
router.get("/details/:eventid", rejectUnauthenticated, (req, res) => {
  let eventid = req.params.eventid;

  const queryText = `
  SELECT * FROM "event" WHERE "id" = $1;
  `;

  pool
    .query(queryText, [eventid])
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500);
    });
});
router.get("/all", rejectUnauthenticated, (req, res) => {
  const queryText = `
  SELECT * FROM "event";
  `;

  pool
    .query(queryText)
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500);
    });
});

router.get("/parents-going/:eventID", rejectUnauthenticated, (req, res) => {
  const queryText = `
  SELECT "user".*, "booking"."going_dates", "booking"."invite-link" AS "booking_invite_link"
    FROM "user"
    JOIN "booking" ON "user"."id" = "booking"."user-id"
    WHERE "booking"."event-id" = $1

    UNION

    SELECT "user".*, NULL AS "going_dates", NULL AS "booking_invite_link"
    FROM "user"
    JOIN "invitee" ON "user"."id" = "invitee"."invited-parent-id"
    WHERE "invitee"."event-id" = $1
    AND "user"."id" NOT IN (
        SELECT "user"."id"
        FROM "user"
        JOIN "booking" ON "user"."id" = "booking"."user-id"
        WHERE "booking"."event-id" = $1
    );
  `;

  pool
    .query(queryText, [req.params.eventID])
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((err) => {
      console.log(`Error making query ${queryText}`, err);
      res.sendStatus(500);
    });
});
module.exports = router;
