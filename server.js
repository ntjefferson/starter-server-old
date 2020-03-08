require("dotenv").config();

const express = require("express");
const cors = require("cors");
const logger = require("./logger/logger");
const port = process.env.PORT || 5000;

const app = express();

// CORS enabled
// Access-Control-Allow-Origin: *
app.use(cors());

// bodyParser now integrated in express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/platform", require("./routes/platform"));

// error handler
app.use((err, req, res, next) => {

  // add this line to include winston logging
  logger.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  , {stack: err.stack, ...err})

  // render the error page
  res.status(err.status || 500).send({ message: err.message });
});

app.listen(port, () => console.log(`Now listening on port ${port}...`));
