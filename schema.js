const { gql } = require("apollo-server");

module.exports= gql`
  type Query {
    getRecordById(id: ID): ApodRow,
    getRecordByDate(date: String): ApodRow,
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