import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query GetBooks(
    $offset: Int
    $limit: Int
    $title: String
    $published_date: String
  ) {
    books(
      offset: $offset
      limit: $limit
      title: $title
      published_date: $published_date
    ) {
      totalCount
      books {
        id
        title
        published_date
        rating {
          count
          average
        }
        author {
          name
        }
      }
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation AddBook($book: AddBookInputs!) {
    addBook(book: $book) {
      title
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($deleteBookId: ID!) {
    deleteBook(id: $deleteBookId) {
      title
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($updateBookId: ID!, $book: EditBookInputs!) {
    updateBook(id: $updateBookId, book: $book)
  }
`;

export const GET_SINGLE_BOOK = gql`
  query GetBook($bookId: ID!) {
    book(id: $bookId) {
      id
      title
      description
      published_date
      author {
        id
        name
      }
      rating {
        average
        count
      }
    }
  }
`;
