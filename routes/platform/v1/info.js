const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const firebaseAdmin = require("../../../config/firebase");
const admin = require("firebase-admin");

router.post("/info", (req, res, next) => {
  const { token } = req.body;

  admin
    .auth()
    .verifyIdToken(token)
    .then(decodedToken => {
      let fb_id = decodedToken.uid;

      // Query and get account information here
      // Make sure to handle error in query


      // Sign JWT token
      jwt.sign(
        {
            // Don't forget to use custom sign, this is only an example
            example: "example"
        },
        // This fields needs to be populated, only have example in .env
        process.env.JWT_SECRET,
        { expiresIn: 7200 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json(token);
        }
      );
      // ...
    })
    .catch((error) => {
      // Handle error
    });
  });

module.exports = router;
