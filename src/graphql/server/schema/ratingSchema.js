const bookSchema = `#graphql
    type AddRatingOutput {
        rating: Float!
        book_id: ID!
    }

    input AddRatingInputs {
        rating: Float!
        book_id: ID!
    }

    type Rating {
        count: Int!
        average: Float!
    }

    type Query {
        rating (book_id: ID!): Rating!
    }

    type Mutation {
        addRating (rating: AddRatingInputs!): AddRatingOutput
    }
`;

export default bookSchema;
