require('dotenv').config();
const _ = require('lodash');
const sqlQueryPromise = require('../utils/sqlQueryPromise');
const sqlConnectPromise = require('../utils/sqlConnectPromise');
const sqlStatements = require('../utils/sqlStatements');
const mySqlEndpoint = process.env.MYSQL_ENDPOINT;
const mySqlUser = process.env.MYSQL_USER;
const mySqlPassword = process.env.MYSQL_PASSWORD;
const sqlConfig = {
  host: mySqlEndpoint,
  user: mySqlUser,
  password: mySqlPassword,
};

async function sqlGetter (sql, plural = false) {
  const con = await sqlConnectPromise(sqlConfig)
      .catch(e => {
        console.error('sqlConnectPromise rejected', e);
        throw 'No Apod Database Connection';
      });

    await sqlQueryPromise(con, sqlStatements.useDatabase)
      .catch(e => {
        console.error('sqlQueryPromise useDatabase rejected', e);
        throw 'Apod Database Cannot Use';
      });

    const response = await sqlQueryPromise(con, sql)
      .catch(e => {
        console.error('sqlQueryPromise useTable rejected', e);
        throw 'Apod Database Query Died';
      });

    con && con.end();

    if (plural) {
      return response;
    }
    return response[0];
}

module.exports = sqlGetter;