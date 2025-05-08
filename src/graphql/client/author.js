import { gql } from "@apollo/client";

export const GET_AUTHORS = gql`
  query GetAuthors(
    $offset: Int
    $limit: Int
    $name: String
    $born_date: String
  ) {
    authors(
      offset: $offset
      limit: $limit
      name: $name
      born_date: $born_date
    ) {
      totalCount
      authors {
        id
        name
        biography
        born_date
        books {
          id
          title
        }
      }
    }
  }
`;

export const GET_AUTHOR_NAMES = gql`
  query AuthorNames {
    authorNames {
      id
      name
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
