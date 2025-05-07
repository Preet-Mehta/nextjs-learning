import { gql } from "@apollo/client";

export const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      id
      name
      biography
      born_date
    }
  }
`;

export const CREATE_AUTHOR = gql`
  mutation AddAuthor($author: AddAuthorInputs!) {
    addAuthor(author: $author) {
      name
    }
  }
`;

export const DELETE_AUTHOR = gql`
  mutation DeleteAuthor($deleteAuthorId: ID!) {
    deleteAuthor(id: $deleteAuthorId) {
      name
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation UpdateAuthor($updateAuthorId: ID!, $author: EditAuthorInputs!) {
    updateAuthor(id: $updateAuthorId, author: $author)
  }
`;
