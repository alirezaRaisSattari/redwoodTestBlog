import AllowUserCell from 'src/components/AllowUserCell'
import PostCell from 'src/components/Post/PostCell'

type PostPageProps = {
  id: number
}

const PostPage = ({ id }: PostPageProps) => {
  return (
    <div>
      <PostCell id={id} />
      <AllowUserCell postId={id} />
    </div>
  )
}

export default PostPage
