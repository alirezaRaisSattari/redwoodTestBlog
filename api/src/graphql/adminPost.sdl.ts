export const schema = gql`
  type Query {
    adminPosts: [Post!]! @requireAuth
    adminPost(id: Int!): Post @requireAuth
  }

  input CreatePostInput {
    title: String!
    body: String!
    allowedusers: [Int]
  }

  input UpdatePostInput {
    title: String
    body: String
    addAllowedusers: [Int]
    removeAllowedusers: [Int]
    allowedusers: [Int]
    notAllowedusers: [Int]
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post! @requireAuth
    updatePost(id: Int!, input: UpdatePostInput!): Post! @requireAuth
    deletePost(id: Int!): Post! @requireAuth
  }
`
