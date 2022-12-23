import type { AllowedUsersRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const allowedUsers = ({ postId }) => {
  return db.allowedUsers.findMany({
    where: { postId },
  })
}

export const createAllowedUsers = ({ input }) => {
  return db.allowedUsers.create({
    data: input,
  })
}

export const deleteAllowedUsers = ({ id }) => {
  return db.allowedUsers.delete({
    where: { id },
  })
}

export const AllowedUsers: AllowedUsersRelationResolvers = {
  post: (_obj, { root }) => {
    return db.allowedUsers.findUnique({ where: { id: root?.id } }).post()
  },
  user: (_obj, { root }) => {
    return db.allowedUsers.findUnique({ where: { id: root?.id } }).user()
  },
}
