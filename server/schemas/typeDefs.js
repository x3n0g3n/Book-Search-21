const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Author {
    name: String
  }

  type Book {
    _id: ID
    title: String
    authors: [Author]
    description: String
    bookId: String
    image: String
    link: String
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    addUser(username: String, email: String, password: String): User
    login(email: String, password: String): User
  }

  type User {
    _id: ID
    username: String
    email: String
  }
`;

module.exports = typeDefs;
