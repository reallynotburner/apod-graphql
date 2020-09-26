require('dotenv').config();
const { DataSource } = require('apollo-datasource');
const _ = require('lodash');

const sqlStatements = require('../utils/sqlStatements');
const sqlGetOne = require('../utils/sqlGetOne');

class ApodHistoryApi extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {
    // FOR cacheing and stuff - advanced topic, later.
  }

  async getRecordById(id) {
    const result = await sqlGetOne(sqlStatements.getRecordById(id));
    return result;
  }

  async getRecordByIsoDate(isoDate) {
    const result = await sqlGetOne(sqlStatements.getRecordByIsoDate(isoDate));
    return result;
  }

  // query
  // direct passing of args means if you can query for 
  // any of the schema properties on a session!
  getSessions(args) {
    return _.filter(sessions, args);
  }
}

module.exports = ApodHistoryApi;