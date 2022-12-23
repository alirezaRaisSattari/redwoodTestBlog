import { useState } from 'react'

import type { UsersQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

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

export const Success = ({ users, students, setStudents }) => {
  React.useEffect(() => {
    setStudents(students)
  }, [])

  console.log(students)
  const addOrRemove = (name) => {
    const index = students.indexOf(name)
    if (index === -1) {
      students.push(name)
    } else {
      students.splice(index, 1)
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
