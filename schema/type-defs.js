const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: String!
    friends: [User]
    favoriteMovies: [Movie]
  }
  
  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }
  
  input CreateUserInput {
    name: String!
    username: String
    age: Int!
    nationality: String!
  }
  
  enum Nationality {
    CANADA,
    BRAZIL,
    INDIA,
    GERMANY,
    CHILE
  }
  
  input UpdateUserInput {
    id: ID!
    userNameNew: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie!
  }

  type Mutation {
    createUsers(input: CreateUserInput!): User!,
    updateUserName(input : UpdateUserInput!) : User!,
    deleteUser ( id : Int!) : User,
  }
`;

module.exports = { typeDefs }