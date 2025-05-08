import { gql } from "@apollo/client";

export const GET_RATINGS_FOR_BOOK = gql`
  query GetRatings($book_id: ID!) {
    rating(book_id: $book_id) {
      average
      count
    }
  }
`;

export const CREATE_RATING_FOR_BOOK = gql`
  mutation CreateRating($rating: AddRatingInputs!) {
    addRating(rating: $rating) {
      book_id
      rating
    }
  }
`;
