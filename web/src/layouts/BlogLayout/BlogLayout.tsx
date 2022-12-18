type BlogLayoutProps = {
  children?: React.ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  return (
    <>
      <p>this is layout</p>
      {children}
    </>
  )
}

export default BlogLayout
