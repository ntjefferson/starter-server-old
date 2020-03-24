const jwt = require("jsonwebtoken");
const firebaseAdmin = require("../../../../config/firebase");
const admin = require("firebase-admin");
const db = require("../../../../config/database");
const handleQueryResults = require("../../../../utils/handleQueryResults");

const info = async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    let err = new Error("Missing required field(s).");
    err.status = 400;
    throw err;
  }

  const decodedToken = await admin.auth().verifyIdToken(token);
  let fb_id = decodedToken.uid;

  // Get info here

  jwt.sign(
    {
      // Sign JWT here
      example: "example"
    },
    // This fields needs to be populated, only have example in .env
    process.env.JWT_SECRET,
    { expiresIn: 7200 },
    (err, token) => {
      if (err) {
        let err = new Error("There was an error signing the token.")
        throw err;
      }
      res.status(200).json({token});
    }
  );
};

module.exports = info;
