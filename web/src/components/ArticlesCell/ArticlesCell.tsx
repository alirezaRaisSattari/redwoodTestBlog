import type { ArticlesQuery } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query ArticlesQuery {
    articles: posts {
      id
      title
      body
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ articles }: CellSuccessProps<ArticlesQuery>) => {
  return (
    <ul>
      {articles.map((article) => {
        return (
          <article key={article.id}>
            <header>
              <Link to={routes.article({ id: article.id })}>
                <h2>{article.title}</h2>
              </Link>
            </header>
            <p>{article.body}</p>
            <div>Posted At: {article.createdAt}</div>
          </article>
        )
      })}
    </ul>
  )
}
