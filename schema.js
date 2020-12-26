const { gql } = require("apollo-server");

module.exports= gql`
  type Query {
    getRecordById(id: ID): ApodRow,
    getRecordByIsoDate(date: String): ApodRow,
    getRecordsByDateRange(beginDate: String, endDate: String, descending: Boolean): [ApodRow],
    getRecordsByYearMonth(year: Int, month: Int, descending: Boolean): [ApodRow],
    getRecordsByYear(year: Int, descending: Boolean): [ApodRow],
    getRecordsPaginatedByMonth(year: Int, month: Int, limit: Int): [Month],
    searchRecords(term: String, number: Int, offset: Int): [ApodRow],
    getRecords(number: Int, offset: Int): [ApodRow],
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
  type Month {
    year: Int,
    month: Int,
    days: [ApodRow]
  }
  type Error {
    code: String
    message: String
    token: String
  }
`;