import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const postBlog = async (blog, token) => {
  console.log('blog: ', blog)
  if (!token) {
    const user = window.localStorage.getItem('loggedInUser')
    const parsedUser = JSON.parse(user)
    token = parsedUser.token
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const updateBlog = async (blog, token) => {
  console.log('blog:', blog)
  if (!token) {
    const user = window.localStorage.getItem('loggedInUser')
    const parsedUser = JSON.parse(user)
    token = parsedUser.token
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.put(`${baseUrl}/${blog._id}`, blog, config)
  return response.data
}

const deleteBlog = async (blog, token) => {
  console.log('blog:', blog)
  if (!token) {
    const user = window.localStorage.getItem('loggedInUser')
    const parsedUser = JSON.parse(user)
    token = parsedUser.token
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.delete(`${baseUrl}/${blog._id}`, config)
  return response.data
}


const blogService = {
  postBlog,
  getAll,
  updateBlog,
  deleteBlog,
}


export default blogService