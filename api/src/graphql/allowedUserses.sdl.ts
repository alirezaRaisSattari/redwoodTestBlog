export const schema = gql`
  type AllowedUsers {
    id: Int!
    post: Post!
    postId: Int!
    user: User!
    userId: Int!
  }

  type Query {
    allowedUsers: [AllowedUsers!]! @requireAuth
    allowedUsers(id: Int!): AllowedUsers @requireAuth
  }

  input CreateAllowedUsersInput {
    postId: Int!
    userId: Int!
  }

  input UpdateAllowedUsersInput {
    postId: Int
    userId: Int
  }

  type Mutation {
    createAllowedUsers(input: CreateAllowedUsersInput!): AllowedUsers!
      @requireAuth
    updateAllowedUsers(
      id: Int!
      input: UpdateAllowedUsersInput!
    ): AllowedUsers! @requireAuth
    deleteAllowedUsers(id: Int!): AllowedUsers! @requireAuth
  }
`
