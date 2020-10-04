require('dotenv').config();
const { DataSource } = require('apollo-datasource');
const _ = require('lodash');

const sqlStatements = require('../utils/sqlStatements');
const sqlGetOne = require('../utils/sqlGetOne');
const sqlGetMultiple = require('../utils/sqlGetMultiple');

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

  async getRecordsByDateRange(beginDate, endDate, descending) {
    const result = await sqlGetMultiple(sqlStatements.getRecordsByDateRange(beginDate, endDate, descending));
    return result;
  }

  async getRecordsByYearMonth(year, month, descending) {
    const result = await sqlGetMultiple(sqlStatements.getRecordsByYearMonth(year, month, descending));
    return result;
  }

  async getRecordsByYear(year, descending) {
    const result = await sqlGetMultiple(sqlStatements.getRecordsByYear(year, descending));
    return result;
  }

  
  async searchRecords(term, number, offset) {
    const result = await sqlGetMultiple(sqlStatements.searchRecords(term, number, offset));
    return result;
  }

  // query
  // direct passing of args means if you can query for 
  // any of the schema properties on a session!
  // getSessions(args) {
  //   return _.filter(sessions, args);
  // }
}

module.exports = ApodHistoryApi;