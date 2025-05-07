export default `#graphql
    input AddAuthorInputs {
        name: String!
        biography: String!
        born_date: String!
    }

    input EditAuthorInputs {
        name: String
        biography: String
        born_date: String
    }

    type Author {
        id: ID!
        name: String!
        biography: String!
        born_date: String!
        books: [Book!]
    }

    type Query {
        authors: [Author]
        author (id: ID!): Author
    }

    type Mutation {
        addAuthor (author: AddAuthorInputs!): Author
        deleteAuthor (id: ID!): Author
        updateAuthor (id: ID!, author: EditAuthorInputs!): [Int!]!
    }
`;
