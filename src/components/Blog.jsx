const Blog = ({ blog, toggleImportance }) => {
  return (
    <li className='blog'>
      {blog.title} 
      <button onClick={toggleImportance}></button>
    </li>
  )
}

export default Blog