import { gql } from "graphql-tag";

const typeDefs = gql`
  type Query {
    users: [User]
    searchUser(value: String): [User]
    products: [Product]
  }

  type Mutation {
    createProduct(
      name: String!
      image: String!
      description: String!
      price: Int!
      type: String!
    ): Product
    updateProduct(
      _id: String!
      name: String
      image: String
      description: String
      price: Int
      type: String
    ): Product
    deleteProduct(_id: String!): Boolean
    deleteUser(_id: String!): Boolean
  }

  type User {
    _id: String
    fullName: String
    email: String
    password: String
    contact: String
    postalCode: String
    address: String
  }

  type Product {
    _id: String
    name: String
    image: String
    description: String
    price: Int
    type: String
  }
`;
export default typeDefs;
