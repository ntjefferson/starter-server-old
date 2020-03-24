const jwt = require("jsonwebtoken");

const jwtAuth = async (req, res, next) => {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token) {
    let err = new Error("No token, authorization denied.");
    err.status = 401;
    next(err);
  }

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      err.status = 400;
      err.message = "Invalid token.";
      next(err);
    }
    return decoded;
  });

  req.user = {
    user_id: decoded.user_id,
    account_id: decoded.account_id,
    admin: decoded.admin,
    super_admin: decoded.super_admin
  };

  if (
    decoded.super_admin === true ||
    decoded.account_id === request.body.account_id
  ) {
    next();
  } else {
    let err = new Error("You are not authorized for this request.");
    err.status = 400;
    next(err);
  }
};

module.exports = jwtAuth;
