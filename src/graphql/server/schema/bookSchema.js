export default `#graphql
    input AddBookInputs {
        title: String!
        description: String!
        published_date: String!
        author_id: ID!
    }

    input EditBookInputs {
        title: String
        description: String
        published_date: String
        author_id: ID
    }

    type Book {
        id: ID!
        title: String!
        description: String!
        published_date: String!
        author: Author!
    }

    type Query {
        books: [Book]
        book (id: ID!): Book
    }

    type Mutation {
        addBook (book: AddBookInputs!): Book
        deleteBook (id: ID!): Book
        updateBook (id: ID!, book: EditBookInputs!): Book
    }
`;
