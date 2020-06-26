const db = require('../database/index');


module.exports.control = {

  getDateData: (requiredDate, cb) => {
    let selectQuery = `SELECT * FROM covidecdc JOIN countrycodes ON covidecdc.country=countrycodes.country  WHERE reportDate='2020-03-25' ORDER BY covidecdc.country;`;

    db.pool.query(selectQuery, (error, response) => {
      if (error) {
        cb('error', null)
      } else {
        cb(null,response)
      }
      // db.pool.end()
    })
  },

  getLatestData: (cb) => {
    let selectQuery = `SELECT * FROM covidecdc JOIN countrycodes ON covidecdc.country=countrycodes.country  WHERE reportDate=(SELECT MAX(reportDate) FROM covidecdc) ORDER BY covidecdc.confirmedcases DESC;`;

    db.pool.query(selectQuery, (error, response) => {
      if (error) {
        cb('error', null)
      } else {
        cb(null,response)
      }
      // db.pool.end()
    })
  },

  getGlobalData: (cb) => {
    let selectQuery = `SELECT reportDate, SUM(confirmedcases) as confirmedcases, SUM(confirmednewcases) AS confirmednewcases, SUM(deaths) AS deaths, SUM(newdeaths) AS newdeaths  FROM covidecdc GROUP BY reportDate ORDER BY reportDate DESC`;

    db.pool.query(selectQuery, (error, response) => {
      if (error) {
        cb('error', null)
      } else {
        cb(null,response)
      }
      // db.pool.end()
    })
  },

  getCountryList: (cb) => {
    let selectQuery = `SELECT country from covidecdc GROUP BY country ORDER BY country`;

    db.pool.query(selectQuery, (error, response) => {
      if (error) {
        cb('error', null)
      } else {
        cb(null,response)
      }
      // db.pool.end()
    })
  },

  getcountryData: (requiredCountryName, cb) => {
    let selectQuery = `SELECT * FROM covidecdc WHERE LOWER(country)= LOWER('${requiredCountryName}') ORDER BY reportDate DESC`;
    console.log(selectQuery)
    db.pool.query(selectQuery, (error, response) => {
      if (error) {
        cb('error', null)
      } else {
        cb(null,response)
      }
      // db.pool.end()
    })
  },

  
}

