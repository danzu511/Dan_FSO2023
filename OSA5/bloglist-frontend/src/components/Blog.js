import React, { useState } from 'react'

import PropTypes from 'prop-types'

const Blog = ({ name, blog, handleLike, handleDelete }) => {
  const [blogInfo, setBlogInfo] = useState('small')
  //const [likes, setLikes] = useState(blog.likes)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }
  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 2,
  }

  const toggleBlogInfo = () => {
    if (blogInfo === 'small') {
      setBlogInfo('big')
    } else {
      setBlogInfo('small')
    }
  }

  if (blogInfo === 'small') {
    return (
      <div key={blog._id} style={blogStyle}>
        Title: {blog.title} &nbsp; Author: {blog.author} &nbsp;
        <button key={`${blog._id}-toggle`} onClick={toggleBlogInfo}>
          View more
        </button>
      </div>
    )
  } else {
    return (
      <div key={blog._id} style={blogStyle}>
        <div key={`${blog._id}-title`}>
          Title: {blog.title} &nbsp; Author: {blog.author} &nbsp;
          <button key={`${blog._id}-toggle`} onClick={toggleBlogInfo}>
            Hide info
          </button>
        </div>
        <div key={`${blog._id}-url`}>
          Url: {blog.url}
        </div>
        <div key={`${blog._id}-likes`}>
          Likes: {blog.likes} &nbsp;
          <button key={`${blog._id}-like`} onClick={() => handleLike(blog._id)}>
            like
          </button>
        </div>
        <div key={`${blog._id}-user`}>
          User: {name}
        </div>
        <div key={`${blog._id}-remove`}>
          <button
            key={`${blog._id}-remove`}
            onClick={() => handleDelete(blog._id)}
            style={{
              backgroundColor: isHovered ? '#FF6B6B' : '#DC143C',
              color: 'white',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
          Remove
          </button>
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  name: PropTypes.string.isRequired,
  blog: PropTypes.object.isRequired,
}

export default Blog
