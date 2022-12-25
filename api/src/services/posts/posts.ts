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

export const post = ({ id }) => {
  return db.post.findUnique({
    where: { id },
  })
}

export const Post = {
  user: (_obj, { root }) =>
    db.post
      .findFirst({
        where: { id: root.id },
      })
      .user(),
}
