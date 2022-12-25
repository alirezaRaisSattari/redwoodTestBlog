import { useContext } from 'react'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Context } from '../Post/PostForm'

export const QUERY = gql`
  query FindAllowUserQuery($postId: Int!) {
    allowUsers: allowedUsers(postId: $postId) {
      id
      userId
      user {
        id
        name
      }
    }
  }
`

const defaultFunc = ({ allowUsers }: CellSuccessProps<any>) => {
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

  React.useEffect(() => {
    setAddAllowedusers(addAllowedusers)
    setRemoveAllowedusers(removeAllowedusers)
    setAllowedusers(allowUsers.map((e) => e.user))
    setNotAllowedusers(notAllowedusers)
  }, [])
  const removeElement = (removedItem) => {
    const usersTemp = allowedusers.filter((e) => e !== removedItem)

    setAllowedusers(usersTemp)
  }

  const addElement = (removedItem) => {
    const usersTemp = addAllowedusers.filter((e) => e !== removedItem)

    setNotAllowedusers([...notAllowedusers, removedItem])
    setAddAllowedusers(usersTemp)
  }

  return (
    <ul>
      {allowedusers.map((item) => {
        return (
          <div key={item.id} className="topping">
            <input
              type="checkbox"
              id={'topping'}
              name="topping"
              value="Paneer"
              checked={true}
              onChange={() => removeElement(item)}
            />
            {item.name}
          </div>
        )
      })}

      {addAllowedusers.map((item) => {
        return (
          <div key={item.id} className="topping">
            <input
              type="checkbox"
              id={'topping'}
              name="topping"
              checked={true}
              value="Paneer"
              onChange={() => addElement(item)}
            />
            {item.name}
          </div>
        )
      })}
    </ul>
  )
}

export const Loading = () => <div>Loading...</div>

export const Empty = defaultFunc

export const Failure = ({ error }: CellFailureProps<any>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = defaultFunc
