import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogCreationForm = ({ onCreateBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }
  const addBlog = async (event) => {
    event.preventDefault()
    console.log('newTitle: ', newTitle)
    const blog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    try {
      console.log('blog: ', blog)
      //const response = await blogService.postBlog(blog)
      //console.log('response: ', response)
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      onCreateBlog(blog)
    } catch (error) {
      // Handle error
    }
  }


  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            value={newTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            id="author"
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          <label htmlFor="url">Url:
          </label>
          <input
            id="url"
            value={newUrl}
            onChange={handleUrlChange}
          />
        </div>
        <button
          type="submit"
          id="create-blog-button"
        >Create</button>
      </form>
    </div>
  )
}

BlogCreationForm.propTypes = {
  onCreateBlog: PropTypes.func.isRequired
}

export default BlogCreationForm