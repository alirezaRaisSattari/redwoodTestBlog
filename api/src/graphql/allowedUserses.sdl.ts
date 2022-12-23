export const schema = gql`
  type AllowedUsers {
    id: Int!
    post: Post!
    postId: Int!
    user: User!
    userId: Int!
  }

  type Query {
    allowedUsers(postId: Int!): [AllowedUsers!]! @requireAuth
  }

  input CreateAllowedUsersInput {
    postId: Int!
    userId: Int!
  }

  type Mutation {
    createAllowedUsers(input: CreateAllowedUsersInput!): AllowedUsers!
      @requireAuth
    deleteAllowedUsers(id: Int!): AllowedUsers! @requireAuth
  }
`
