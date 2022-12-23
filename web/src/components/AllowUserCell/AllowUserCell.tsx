import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query FindAllowUserQuery($postId: Int!) {
    allowUsers: allowedUsers(postId: $postId) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps<any>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ allowUser }: CellSuccessProps<any>) => {
  return <div>xxxxxxxxxxx{JSON.stringify(allowUser)}</div>
}
