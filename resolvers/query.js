module.exports = {
  getRecordById: (parent, {id}, { dataSources }, info) => {
    return dataSources.apodHistoryAPI.getRecordById(id);
  },
  getRecordByIsoDate: (parent, {date}, { dataSources }, info) => {
    return dataSources.apodHistoryAPI.getRecordByIsoDate(date);
  },
  getRecordsByDateRange: (parent, {beginDate, endDate, descending}, { dataSources }, info) => {
    return dataSources.apodHistoryAPI.getRecordsByDateRange(beginDate, endDate, descending);
  },
  getRecordsByYear: (parent, {year, descending}, { dataSources }, info) => {
    return dataSources.apodHistoryAPI.getRecordsByYear(year, descending);
  },
  getRecordsByYearMonth: (parent, {year, month, descending}, { dataSources }, info) => {
    return dataSources.apodHistoryAPI.getRecordsByYearMonth(year, month, descending);
  },
  getRecordsPaginatedByMonth: (parent, {year, month, limit}, { dataSources }, info) => {
    return dataSources.apodHistoryAPI.getRecordsPaginatedByMonth(year, month, limit);
  },
  searchRecords: (parent, {term, number, offset}, { dataSources }, info) => {
    return dataSources.apodHistoryAPI.searchRecords(term, number, offset);
  },
};
