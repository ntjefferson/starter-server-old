const knex = require("knex")({
    client: "pg",
    searchPath: "master",
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    }
  });
  
  knex.on("query-error", (err, obj) => {
    let error = {};
    error.message = "There was an error querying the database. Contact support."
    error.query = obj;
    error.details = err;
    throw error;
  });
  
  module.exports = knex;
  