const express = require("express");
const jwt = require("jsonwebtoken");
const firebaseAdmin = require("../../../config/firebase");
const admin = require("firebase-admin");

const info = async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    let err = new Error("Missing required field(s).");
    err.status = 400;
    err.required = [{ field: "token" }];
    throw err;
  }

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
    });
};

module.exports = info;
