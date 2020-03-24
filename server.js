require("dotenv").config();

const express = require("express");
const cors = require("cors");
const responseTime = require("response-time");
const logger = require("./logger/logger");
const successLogger = require("./logger/successLogger");
const port = process.env.PORT || 5000;

const app = express();

// Response time
app.use(responseTime({ digits: 0, suffix: false }));

// CORS enabled
// Access-Control-Allow-Origin: *
app.use(cors());

// BodyParser now integrated in express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handles successful requests
app.use(successLogger);

// Start of routes
app.use("/platform", require("./routes/platform"));

// Error handler
app.use((err, req, res, next) => {
  if (!err.details) {
    err = { details: err };
  }

  // Status Code
  let status = err.status || err.details.status;

  // Error message
  let message = err.message || err.details.message;

  // add this line to include winston logging
  logger.error(message, {
    status: status || 500,
    originalUrl: req.originalUrl,
    path: req.path,
    method: req.method,
    ip: req.ip,
    duration: parseInt(res.getHeaders()["x-response-time"]),
    headers: req.headers,
    body: req.body,
    params: req.params,
    ...err
  });

  // render the error page
  res.status(status || 500).send({
    status: status || 500,
    message:
      message ||
      "There was an error processing the request. Please contact support."
  });
});

app.listen(port, () => console.log(`Now listening on port ${port}...`));
