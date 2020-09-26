module.exports = {
  getRecordById: (parent, {id}, { dataSources }, info) => {
    return dataSources.apodHistoryAPI.getRecordById(id);
  },
};
