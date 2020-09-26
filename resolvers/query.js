module.exports = {
  getRecordById: (parent, {id}, { dataSources }, info) => {
    return dataSources.apodHistoryAPI.getRecordById(id);
  },
  getRecordByIsoDate: (parent, {date}, { dataSources }, info) => {
    return dataSources.apodHistoryAPI.getRecordByIsoDate(date);
  },
  getRecordsByDateRange: (parent, {beginDate, endDate}, { dataSources }, info) => {
    return dataSources.apodHistoryAPI.getRecordsByDateRange(beginDate, endDate);
  },
  searchRecords: (parent, {term, number, offset}, { dataSources }, info) => {
    return dataSources.apodHistoryAPI.searchRecords(term, number, offset);
  },
};
