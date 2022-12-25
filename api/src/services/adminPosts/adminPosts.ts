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
  const { allowedusers, ...postInput } = input

  const allowedUsersList = allowedusers?.map((item) => {
    return { userId: item }
  })
  return db.post.create({
    data: {
      ...postInput,
      allowedUsers: {
        create: allowedUsersList ?? [],
      },
      userId: context.currentUser.id,
    },
  })
}

export const updatePost = ({ id, input }) => {
  const { allowedusers, ...postInput } = input
  return db.post.update({
    data: {
      ...postInput,
      allowedUsers: {
        create: [{ userId: allowedusers[0] }, { userId: allowedusers[1] }],
      },
      userId: context.currentUser.id,
    },
    where: { id },
  })
}

export const deletePost = async ({ id }) => {
  await db.allowedUsers.deleteMany({ where: { postId: id } })
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
