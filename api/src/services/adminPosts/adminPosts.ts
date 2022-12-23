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
  const { students, ...postInput } = input
  console.log(students)

  return db.post.create({
    data: {
      ...postInput,
      allowedUsers: {
        create: [{ userId: students[0] }, { userId: students[1] }],
      },
      userId: context.currentUser.id,
    },
  })
}

export const updatePost = ({ id, input }) => {
  return db.post.update({
    data: input,
    where: { id },
  })
}

export const deletePost = ({ id }) => {
  return db.post.delete({
    where: { id },
  })
}

export const AdminPost = ({ id }) => {
  return db.post
    .findFirst({
      where: { id, userId: context.currentUser.id },
    })
    .allowedUsers()
}
