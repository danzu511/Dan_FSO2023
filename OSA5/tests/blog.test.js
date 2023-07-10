const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const listHelper = require('../utils/list_helper')
const Blog = require('../models/blog')

const api = supertest(app)

let userToken // Variable to store the login token

beforeAll(async () => {
  // Perform the setup - create a user account and store its information
  // You can use your existing code or implement the user creation logic here
  // For example:
  const userData = {
    username: 'testuser',
    password: 'testpassword',
    // other user properties
  }

  // Create the user account
  await api
    .post('/api/users')
    .send(userData)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // Perform login and store the token in the userToken variable
  const loginResponse = await api
    .post('/api/login')
    .send(userData)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  userToken = loginResponse.body.token
})

test('dummy', () => {
  const blogs = ['test']

  const result = listHelper.dummy(blogs)
  console.log('userToken: ', userToken)
  expect(result).toBe(1)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs are identified by id', async () => {
  const response = await api.get('/api/blogs')
  const ids = response.body.map((blog) => blog.id)
  expect(ids).toBeDefined()
})

test('a valid blog can be added to database ', async () => {
  const newBlog = {
    title: 'Test blog',
    author: 'Test author',
    url: 'http://testurl.com',
    likes: 5,
  }
  const initialBlogs = await api.get('/api/blogs')
  const initialLength = initialBlogs.body.length
  //  test that the new blog is added to the database
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${userToken}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const blogsAtEnd = await api.get('/api/blogs')
  //  test that the new blogs content is correct
  expect(blogsAtEnd.body[initialLength].title).toBe(newBlog.title)
  const endLength = blogsAtEnd.body.length
  //  test that the new blogs length is one more than the initial length
  expect(endLength).toBe(initialLength + 1)
})

test('a blog without likes is added with 0 likes', async () => {
  const newBlog = new Blog({
    title: 'Test blog',
    author: 'Test author',
    url: 'http://testurl.com',
  })
  expect(newBlog.likes).toBe(0)
})

test('a blog without title and url gives error code 400', async () => {
  const newBlog = new Blog({
    author: 'Test author',
    likes: 5,
  })
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${userToken}`)
    .send(newBlog)
    .expect(400)
})

test('a blog can be deleted', async () => {
  const initialBlogs = await api.get('/api/blogs')
  const initialLength = initialBlogs.body.length
  await api
    .delete(`/api/blogs/${initialBlogs.body[initialLength - 1].title}`)
    .set('Authorization', `Bearer ${userToken}`)
    .expect(200)
  const blogsAtEnd = await api.get('/api/blogs')
  const endLength = blogsAtEnd.body.length
  expect(endLength).toBe(initialLength - 1)
})

test('a blog likes can be updated', async () => {
  const initialBlogs = await api.get('/api/blogs')
  const initialLength = initialBlogs.body.length
  const updatedBlog = initialBlogs.body[initialLength - 1]
  updatedBlog.likes = 100
  await api
    .put(`/api/blogs/${updatedBlog.title}`)
    .send(updatedBlog)
    .expect(200)
  const blogsAtEnd = await api.get('/api/blogs')
  expect(blogsAtEnd.body[initialLength - 1].likes === 10)
})

test('blog cannot be added without token', async () => {
  const newBlog = {
    title: 'no token blog',
    author: 'Test author',
    url: 'http://testurl.com',
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

describe('total likes', () => {
  const singleBlog = [
    { title: 'Blog single', likes: 7 },
  ]
  const blogs = [
    { title: 'Blog 1', likes: 10 },
    { title: 'Blog 2', likes: 5 },
    { title: 'Blog 3', likes: 2 },
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(singleBlog)
    expect(result).toBe(7)
  })
  test('when list has multiple blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(17)
  })
})

describe('favorite blog', () => {
  const singleBlog = [
    { title: 'Blog single', likes: 7 },
  ]
  const blogs = [
    { title: 'Blog 1', likes: 10 },
    { title: 'Blog 2', likes: 5 },
    { title: 'Blog 3', likes: 2 },
  ]
  const multipleFavoriteBlogs = [
    { title: 'Blog 1', likes: 10 },
    { title: 'Blog 2', likes: 10 },
    { title: 'Blog 3', likes: 2 },
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.favoriteBlog(singleBlog)
    expect(result).toEqual(singleBlog)
  })
  test('when list has multiple blogs', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual([{ title: 'Blog 1', likes: 10 }])
  })
  test('when list has multiple blogs with same likes', () => {
    const result = listHelper.favoriteBlog(multipleFavoriteBlogs)
    expect(result).toEqual([{ title: 'Blog 1', likes: 10 }, { title: 'Blog 2', likes: 10 }])
  })
})

describe('most blogs', () => {
  const blogs = [
    { author: 'Author 1', title: 'Blog 1' },
    { author: 'Author 2', title: 'Blog 2' },
    { author: 'Author 1', title: 'Blog 3' },
    { author: 'Author 3', title: 'Blog 4' },
    { author: 'Author 3', title: 'Blog 5' },
    { author: 'Author 3', title: 'Blog 6' },
  ]

  test('when list has multiple blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual([{ author: 'Author 3', blogs: 3 }])
  })
})

describe('most likes', () => {
  const blogs = [
    { author: 'Author 1', title: 'Blog 1', likes: 10 },
    { author: 'Author 2', title: 'Blog 2', likes: 5 },
    { author: 'Author 1', title: 'Blog 3', likes: 2 },
    { author: 'Author 3', title: 'Blog 4', likes: 1 },
    { author: 'Author 3', title: 'Blog 5', likes: 2 },
  ]

  test('Author with most likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual([{ author: 'Author 1', likes: 12 }])
  })
})

afterAll(async () => {
  const userToDelete = {
    username: 'testuser',
  }
  await api
    .delete(`/api/users/${userToDelete.username}`)
    .set('Authorization', `Bearer ${userToken}`)
    .expect(200)
  await mongoose.connection.close()
})
