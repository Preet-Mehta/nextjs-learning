const bookSchema = `#graphql
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
        rating: Rating!
    }

    type PaginatedBooks {
        books: [Book!]!
        totalCount: Int!
    }

    type Query {
        books (offset: Int, limit: Int, title: String, published_date: String): PaginatedBooks!
        book (id: ID!): Book
    }

    type Mutation {
        addBook (book: AddBookInputs!): Book
        deleteBook (id: ID!): Book
        updateBook (id: ID!, book: EditBookInputs!): [Int!]!
    }
`;

export default bookSchema;
