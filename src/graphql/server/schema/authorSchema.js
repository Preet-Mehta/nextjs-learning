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

    type PaginatedAuthors {
        authors: [Author!]!
        totalCount: Int!
    }

    type AuthorNames {
        id: ID!
        name: String!
    }

    type Query {
        authors(offset: Int, limit: Int, name: String, born_date: String): PaginatedAuthors!
        author (id: ID!): Author
        authorNames: [AuthorNames!]!
    }

    type Mutation {
        addAuthor (author: AddAuthorInputs!): Author
        deleteAuthor (id: ID!): Author
        updateAuthor (id: ID!, author: EditAuthorInputs!): [Int!]!
    }
`;
