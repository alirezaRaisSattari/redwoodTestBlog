import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindAllowUserQuery($postId: Int!) {
    allowUsers: allowedUsers(postId: $postId) {
      id
      userId
      user {
        name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps<any>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ allowUsers }: CellSuccessProps<any>) => {
  
  return (
    <div className="space-y-8">
      {allowUsers.map((allowUser) => (
        <p key={allowUser.id}>{allowUser.user.name}</p>
      ))}
    </div>
  )
}
