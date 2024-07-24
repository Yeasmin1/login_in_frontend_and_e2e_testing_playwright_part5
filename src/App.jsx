// App.js
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Footer from './components/Footer'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const fetchBlogs = async () => {
      if (user) {
        try {
          const blogs = await blogService.getAll()
          blogs.sort((a, b) => b.likes - a.likes)
          setBlogs(blogs)
        } catch (error) {
          setNotification('Failed to fetch blogs')
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        }
      }
    }
    fetchBlogs()
  }, [user])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const updateBlog = (updatedBlog) => {
    setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog).sort((a, b) => b.likes - a.likes))
  }

  const deleteBlog = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id).sort((a, b) => b.likes - a.likes))
  }

  if (user === null) {
    return (
      <div>
        <Notification message={notification} />
        <Togglable buttonLabel='Login'>
          <LoginForm setUser={setUser} setNotification={setNotification} />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel="Create blog" ref={blogFormRef}>
        <NewBlogForm
          setBlogs={setBlogs}
          setNotification={setNotification}
          toggleVisibility={() => blogFormRef.current.toggleVisibility()}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
      )}
      <Footer />
    </div>
  )
}

export default App
