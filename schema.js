const { gql } = require("apollo-server");

module.exports= gql`
  type Query {
    getRecordById(id: ID): ApodRow,
  }
  type ApodRow {
    id: ID!
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