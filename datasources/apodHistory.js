require('dotenv').config();
const { DataSource } = require('apollo-datasource');
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

class ApodHistoryApi extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {
    // FOR cacheing and stuff - advanced topic, later.
  }

  async getRecordById(id) {
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

    const response = await sqlQueryPromise(con, sqlStatements.getRecordById(id))
      .catch(e => {
        console.error('sqlQueryPromise useTable rejected', e);
        throw 'Apod Database Query Died';
      });

    con && con.end();
    return response[0];
  }

  async getRecordByDate(isoDate) {
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

    const response = await sqlQueryPromise(con, sqlStatements.getRecordByDate(isoDate))
      .catch(e => {
        console.error('sqlQueryPromise useTable rejected', e);
        throw 'Apod Database Query Died';
      });

    con && con.end();
    return response[0];
  }

  // query
  // direct passing of args means if you can query for 
  // any of the schema properties on a session!
  getSessions(args) {
    return _.filter(sessions, args);
  }
}

module.exports = ApodHistoryApi;