require("dotenv").config();

const config = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: "mysql"
      }
      // test: ,{
      //   username: process.env.DB_USER,
      //   password: process.env.DB_PASS,
      //   database: process.env.DB_TESTDATABASE,
      //   host: process.env.DB_HOST,
      //   dialect: "mysql"
      // }
    //   FOR HEROKU
    // ,production: { 
    //     use_env_variable: 
    //     "JAWSDB_URL",
    //         dialect: "mysql"
    //     }
};

module.exports = config;