import { gql } from "@apollo/client";
export const GET_USERS = gql`
  query {
    users {
      _id
      fullName
      address
      contact
    }
  }
`;
export const GET_PRODUCTS = gql`
  query {
    products {
      _id
      name
      image
      description
      price
      type
    }
  }
`;
export const DELETE_USER = gql`
  mutation DeleteUser($_id: String!) {
    deleteUser(_id: $_id)
  }
`;
export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $name: String!
    $image: String!
    $description: String!
    $price: Int!
    $type: String!
  ) {
    createProduct(
      name: $name
      image: $image
      description: $description
      price: $price
      type: $type
    ) {
      _id
      name
      image
      description
      price
      type
    }
  }
`;
export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $_id: String!
    $name: String
    $image: String
    $description: String
    $price: Int
    $type: String
  ) {
    updateProduct(
      _id: $_id
      name: $name
      image: $image
      description: $description
      price: $price
      type: $type
    ) {
      _id
      name
      image
      description
      price
      type
    }
  }
`;
export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($_id: String!) {
    deleteProduct(_id: $_id)
  }
`;

