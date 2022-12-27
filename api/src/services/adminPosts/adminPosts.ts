import { db } from 'src/lib/db'

export const adminPosts = () => {
  return db.post.findMany({ where: { userId: context.currentUser.id } })
}

export const adminPost = ({ id }) => {
  return db.post.findFirst({
    where: { id, userId: context.currentUser.id },
  })
}

export const createPost = ({ input }) => {
  const { allowedusers, addAllowedusers, ...postInput } = input

  const allowedUsersList = allowedusers?.map((item) => {
    return { userId: item }
  })
  const addAllowedusersList = addAllowedusers?.map((item) => {
    return { userId: item }
  })
  return db.post.create({
    data: {
      ...postInput,
      allowedUsers: {
        create: [...addAllowedusersList, ...allowedUsersList] ?? [],
      },
      userId: context.currentUser.id,
    },
  })
}

export const updatePost = ({ id, input }) => {
  const { allowedusers, addAllowedusers, ...postInput } = input
  const allowedUsersList = allowedusers?.map((item) => {
    return { userId: item }
  })
  const addAllowedusersList = addAllowedusers?.map((item) => {
    return { userId: item }
  })
  return db.post.update({
    data: {
      ...postInput,
      allowedUsers: {
        deleteMany: { postId: postInput.id },
        create: [...addAllowedusersList, ...allowedUsersList],
      },
      userId: context.currentUser.id,
    },
    where: { id },
  })
}

export const deletePost = async ({ id }) => {
  return db.post.delete({
    where: { id },
  })
}

export const AdminPost = ({ id }) => {
  return db.post
    .findFirst({
      where: { id, userId: context.currentUser.id },
      include: {
        allowedUsers: true,
      },
    })
    .allowedUsers()
}
