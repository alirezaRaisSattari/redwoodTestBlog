import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const posts = () => {
  if (context.currentUser.roles === 'admin') return db.post.findMany()
  else
    return db.post.findMany({
      where: {
        OR: [
          { userId: context.currentUser.id },
          {
            allowedUsers: { some: { userId: context.currentUser.id } },
          },
        ],
      },
    })
}

export const post = async ({ id }) => {
  if (context.currentUser.roles === 'admin')
    return db.post.findUnique({
      where: { id },
    })
  else {
    const foundedPost = await db.post.findMany({
      where: {
        OR: [
          { id, userId: context.currentUser.id },
          {
            id,
            allowedUsers: { some: { userId: context.currentUser.id } },
          },
        ],
      },
    })
    if (!foundedPost.length) requireAuth({ roles: 'admin' })
    return foundedPost
  }
}

export const Post = {
  user: (_obj, { root }) =>
    db.post
      .findFirst({
        where: { id: root.id },
      })
      .user(),
}
