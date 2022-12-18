import { MetaTags } from '@redwoodjs/web'

type ComponentInput = { id: number }
import ArticleCell from 'src/components/ArticleCell'

const ArticlePage = ({ id }: ComponentInput) => {
  return (
    <>
      <MetaTags title="Article" description="Article page" />

      <ArticleCell id={id} />
    </>
  )
}

export default ArticlePage
