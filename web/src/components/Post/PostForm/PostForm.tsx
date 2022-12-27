import { createContext, useState } from 'react'

import type { EditPostById, UpdatePostInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

import AllowUserListCell from 'src/components/AllowUserListCell'
import UsersCell from 'src/components/UsersCell'

export const Context = createContext({})

type FormPost = NonNullable<EditPostById['post']>

interface PostFormProps {
  post?: EditPostById['post']
  onSave: (data: UpdatePostInput, id?: FormPost['id']) => void
  error: RWGqlError
  loading: boolean
}

export const AddAllowContext = createContext({
  addedUser: [],
  setAddedUser: () => {},
})

const PostForm = (props: PostFormProps) => {
  const [addAllowedusers, setAddAllowedusers] = useState([])
  const [removeAllowedusers, setRemoveAllowedusers] = useState([])
  const [allowedusers, setAllowedusers] = useState([])
  const [notAllowedusers, setNotAllowedusers] = useState([])

  const onSubmit = (data: FormPost) => {
    props.onSave(
      {
        ...data,
        addAllowedusers: addAllowedusers.map((e) => e.id),
        allowedusers: allowedusers.map((e) => e.id),
      },
      props?.post?.id
    )
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>
        <TextField
          name="title"
          defaultValue={props.post?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="title" className="rw-field-error" />
        <Label
          name="body"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Body
        </Label>
        <TextField
          name="body"
          defaultValue={props.post?.body}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <Context.Provider
          value={{
            addAllowedusers,
            setAddAllowedusers,
            removeAllowedusers,
            setRemoveAllowedusers,
            allowedusers,
            setAllowedusers,
            notAllowedusers,
            setNotAllowedusers,
          }}
        >
          <table>
            <tr>
              <th>allowed for</th>
              <td>
                <AllowUserListCell postId={props?.post?.id ?? -1} />
              </td>
            </tr>
            <tr className="mt-6">
              <th>not allowed for</th>
              <td>
                <UsersCell />
              </td>
            </tr>
          </table>
        </Context.Provider>
        <FieldError name="body" className="rw-field-error" />
        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PostForm
