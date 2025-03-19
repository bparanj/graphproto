const { gql } = require('apollo-server');

const typeDefs = gql`
  type Customer {
    userId: ID!
    name: String!
    email: String!
  }
  
  type Account {
    accountId: ID!
    balance: Float!
    openDate: String!
    accountType: AccountType
  }
  
  type AccountType {
    typeId: ID!
    name: String!
    description: String!
    interestRate: Float!
  }
    
  type AccountSummary {
    accounts: [Account!]!
    totalBalance: Float!
  }
  
  type Query {
    accounts: [Account!]!
    account(accountId: ID!): Account
    accountSummary: AccountSummary!
  }
`;

module.exports = typeDefs;