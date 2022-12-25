import { useContext } from 'react'

import type { CellFailureProps } from '@redwoodjs/web'

import { Context } from '../Post/PostForm'

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

export const Success = ({ users }) => {
  const {
    addAllowedusers,
    setAddAllowedusers,
    removeAllowedusers,
    setRemoveAllowedusers,
    allowedusers,
    setAllowedusers,
    notAllowedusers,
    setNotAllowedusers,
  } = useContext(Context)
  // const [userlist, setUserlist] = React.useState(users)
  React.useEffect(() => {
    setAddAllowedusers(addAllowedusers)
    setRemoveAllowedusers(removeAllowedusers)
    setAllowedusers(allowedusers)
    setNotAllowedusers(users)
  }, [])

  const addElement = (item) => {
    const usersTemp = notAllowedusers.filter((e) => e !== item)
    setAddAllowedusers([...addAllowedusers, item])
    setNotAllowedusers(usersTemp)
  }

  const removeElement = (item) => {
    const usersTemp = removeAllowedusers.filter((e) => e !== item)
    setAllowedusers([...allowedusers, item])
    setRemoveAllowedusers(usersTemp)
  }

  return (
    <ul>
      {notAllowedusers.map((item) => {
        if (!allowedusers.some((i) => item.id === i.id))
          return (
            <div key={item.id} className="topping">
              <input
                type="checkbox"
                id={'topping'}
                name="topping"
                checked={false}
                value="Paneer"
                onChange={() => addElement(item)}
              />
              {item.name}
            </div>
          )
      })}
      {removeAllowedusers.map((item) => {
        return (
          <div key={item.id} className="topping">
            <input
              type="checkbox"
              id={'topping'}
              name="topping"
              checked={false}
              value="Paneer"
              onChange={() => removeElement(item)}
            />
            {item.name}
          </div>
        )
      })}
    </ul>
  )
}
