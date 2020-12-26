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

  async getRecordsPaginatedByMonth(year, month, limit = 1) {
    try {
      const collection = [];
      const cursorDate = new Date(`${year}-${month + 1}-05`); // 05 removes UTC complexities
  
      let cursorMonth;
      let cursorYear;

      while (limit > 0) {
        try {
          cursorMonth = cursorDate.getMonth();
          cursorYear = cursorDate.getFullYear();
  
          const result = await sqlGetMultiple(sqlStatements.getRecordsByYearMonth(cursorYear, cursorMonth));
          limit--;
          cursorDate.setMonth(cursorDate.getMonth() - 1);
    
          if (result) {
            const collectionObject = {
              year: cursorYear,
              month: cursorMonth,
              days: result
            }
            collection.push(collectionObject);
          }
        } catch (e) {
          break;
        }
        
      }
  
      return collection;
    } catch (e) {
      return [];
    }
    
  }

  async getRecordsByYear(year, descending) {
    const result = await sqlGetMultiple(sqlStatements.getRecordsByYear(year, descending));
    return result;
  }

  async searchRecords(term, number, offset) {
    const result = await sqlGetMultiple(sqlStatements.searchRecords(term, number, offset));
    return result;
  }

  async getRecords(number, offset) {
    const result = await sqlGetMultiple(sqlStatements.getRecords(number, offset));
    return result;
  }
}

module.exports = ApodHistoryApi;