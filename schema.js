const { gql } = require("apollo-server");

module.exports= gql`
  type Query {
    getRecordById(id: ID): ApodRow,
    getRecordByIsoDate(date: String): ApodRow,
    getRecordsByDateRange(beginDate: String, endDate: String): [ApodRow],
    getRecordsByYearMonth(year: Int, month: Int, descending: Boolean): [ApodRow],
    searchRecords(term: String, number: Int, offset: Int): [ApodRow],
  }
  type ApodRow {
    id: ID!
    date: String
    title: String
    media_type: String
    url: String
    hdurl: String
    thumbnailUrl: String
    explanation: String
    copyright: String
  }
  type Error {
    code: String
    message: String
    token: String
  }
`;