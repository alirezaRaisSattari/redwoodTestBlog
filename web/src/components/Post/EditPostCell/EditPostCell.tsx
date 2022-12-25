import type { EditPostById, UpdatePostInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY as allowedUsersQuery } from 'src/components/AllowUserListCell'
import PostForm from 'src/components/Post/PostForm'
import { QUERY as userQuery } from 'src/components/UsersCell'

export const QUERY = gql`
  query EditPostById($id: Int!) {
    post: adminPost(id: $id) {
      id
      title
      body
      createdAt
    }
  }
`

const UPDATE_POST_MUTATION = gql`
  mutation UpdatePostMutation($id: Int!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
      body
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ post }) => {
  const [updatePost, { loading, error }] = useMutation(UPDATE_POST_MUTATION, {
    onCompleted: () => {
      toast.success('Post updated')
      navigate(routes.posts())
    },
    // refetchQueries: [
    //   {
    //     query: userQuery,
    //   },
    //   {
    //     query: allowedUsersQuery,
    //     variables: { postId: post.id },
    //   },
    // ],
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: UpdatePostInput, id: EditPostById['post']['id']) => {
    updatePost({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Post {post?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PostForm post={post} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
