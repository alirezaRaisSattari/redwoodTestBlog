import type { CellFailureProps } from '@redwoodjs/web'

import AllowUserCell from '../AllowUserCell'

export const QUERY = gql`
  query UsersQuery {
    users {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ users, allowedusers, setStudents }) => {
  React.useEffect(() => {
    setStudents(allowedusers)
  }, [])

  const addOrRemove = (name) => {
    const index = allowedusers.indexOf(name)
    if (index === -1) {
      allowedusers.push(name)
    } else {
      allowedusers.splice(index, 1)
    }
  }
  return (
    <ul>
      {users.map((item) => {
        return (
          <div key={item.id} className="topping">
            <input
              type="checkbox"
              id={'topping'}
              name="topping"
              value="Paneer"
              onChange={() => addOrRemove(item.id)}
            />
            {item.name}
          </div>
        )
      })}
    </ul>
  )
}
