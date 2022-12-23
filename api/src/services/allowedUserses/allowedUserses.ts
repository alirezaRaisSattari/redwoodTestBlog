import type {
  QueryResolvers,
  MutationResolvers,
  AllowedUsersRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const allowedUsers: QueryResolvers['allowedUsers'] = () => {
  return db.allowedUsers.findMany()
}

export const allowedUsers: QueryResolvers['allowedUsers'] = ({ id }) => {
  return db.allowedUsers.findUnique({
    where: { id },
  })
}

export const createAllowedUsers: MutationResolvers['createAllowedUsers'] = ({
  input,
}) => {
  return db.allowedUsers.create({
    data: input,
  })
}

export const updateAllowedUsers: MutationResolvers['updateAllowedUsers'] = ({
  id,
  input,
}) => {
  return db.allowedUsers.update({
    data: input,
    where: { id },
  })
}

export const deleteAllowedUsers: MutationResolvers['deleteAllowedUsers'] = ({
  id,
}) => {
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
