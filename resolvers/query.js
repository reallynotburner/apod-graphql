module.exports = {
  getRecordById: (parent, {id}, { dataSources }, info) => {
    return dataSources.apodHistoryAPI.getRecordById(id);
  },
  getRecordByDate: (parent, {date}, { dataSources }, info) => {
    return dataSources.apodHistoryAPI.getRecordByDate(date);
  },
};
