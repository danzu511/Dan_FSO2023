import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import LogOut from './components/LogOut'
import BlogCreationForm from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [loggedInUsername, setLoggedInUsername] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  // Check if token exists in local storage and login user if it does
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setLoggedIn(true)
      setLoggedInUsername(user.username)
      blogService.getAll().then((blogs) => {
        const filteredBlogs = blogs.filter(
          (blog) => blog.user !== null && user.username === blog.user.username
        )
        setBlogs(filteredBlogs)
      })
    }
  }, [])

  const handleLogin = (username, errorMessage) => {
    if (errorMessage) {
      displayNotification(errorMessage, 'error')
    } else {
      setLoggedIn(true)
      setLoggedInUsername(username)
      blogService.getAll().then((blogs) => {
        const filteredBlogs = blogs.filter(
          (blog) => blog.user !== null && username === blog.user.username
        )
        setBlogs(filteredBlogs)
      })
    }
  }

  const handleBlogCreation = async (blog) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = [...prevBlogs, blog]
      console.log('blogs: ', updatedBlogs)

      // Define an async function to use await
      const postBlogAsync = async () => {
        const response = await blogService.postBlog(blog)
        console.log('response: ', response)
        displayNotification(`A new blog ${blog.title} by ${blog.author} added`, 'success')
      }

      postBlogAsync() // Call the async function to execute the asynchronous operation

      return updatedBlogs
    })
  }


  const displayNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleLike = (blogId) => {
    console.log('handleLike called')
    const updatedBlogs = blogs.map((blog) => {
      if (blog._id === blogId) {
        const newLikes = blog.likes + 1
        return { ...blog, likes: newLikes }
      }
      return blog
    })

    setBlogs(updatedBlogs)

    // Call blogService.updateBlog to update the blog on the server
    const blogToUpdate = updatedBlogs.find((blog) => blog._id === blogId)
    if (blogToUpdate) {
      blogService.updateBlog(blogToUpdate)
    }
  }

  const handleDelete = async (blogId) => {
    const blogToDelete = blogs.find((blog) => blog._id === blogId)
    if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`)) {
      try {
        await blogService.deleteBlog(blogToDelete)
        setBlogs((prevBlogs) => prevBlogs.filter((b) => b._id !== blogId))
      } catch (error) {
        console.log('error: ', error)
      }
    }
  }




  return (
    <div>
      {notification && <Notification message={notification.message} type={notification.type}/>}
      {loggedIn ? (
        <div>
          <h2>blogs</h2>
          <LogOut onLogOut={() => setLoggedIn(false)} user={loggedInUsername} />
          <br></br>
          <Togglable buttonLabel="Create new blog">
            <BlogCreationForm onCreateBlog={handleBlogCreation} />
          </Togglable>
          <br></br>
          {blogs
            .sort((a, b) => b.likes - a.likes) // Sort blogs in descending order by likes
            .map((blog) => (
              <div key={`${blog._id}-1`}
                className='blog'>
                <Blog key={blog._id}
                  blog={blog}
                  name={loggedInUsername}
                  setBlogs={setBlogs}
                  handleLike={handleLike}
                  handleDelete={handleDelete}/>

                {/* Additional information about the blog */}
                <p></p>
                {/* Add more information as needed */}
              </div>
            ))}



        </div>
      ) : (
        <div>
          <h1>Login Page</h1>
          <LoginForm onLogin={handleLogin} />
        </div>
      )}
    </div>
  )
}

export default App
