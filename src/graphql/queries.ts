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
