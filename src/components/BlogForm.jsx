import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState('')
  

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlog,
      author: newAuthor,
      url: newUrl,
      likes: newLikes
    })
    setNewTitle('')
    setNewAuthor('')
    newUrl('')
    newLikes('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <input
          value={newTitle}
          onChange={event => setNewTitle(event.target.value)}
        />
        <input
          value={newAuthor}
          onChange={event => setNewAuthor(event.target.value)}
        />
        <input
          value={newUrl}
          onChange={event => setNewUrl(event.target.value)}
        />
        <input
          value={newLikes}
          onChange={event => setNewLikes(event.target.value)}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm