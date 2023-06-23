const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  //   Check if username and password are at least 3 characters long
  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({ error: 'username and password must be at least 3 characters long' })
  }
  //    Check if username already exists in database
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({ error: 'username already chosen' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.delete('/:username', async (request, response) => {
  const { username } = request.params
  if (!username) {
    return response.status(400).json({ error: 'Username is required' })
  }
  const deletedPerson = await User.findOneAndDelete({ username })
  if (!deletedPerson) {
    return response.status(404).json({ error: 'User not found' })
  }
  response.status(200).json({ message: 'User deleted successfully' })
})

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({})
    const populatedUsers = []

    for (const user of users) {
      const userBlogs = await Blog.find({ user: user._id }) // Find blogs for the current user
      const populatedUser = { ...user.toObject(), blogs: userBlogs }
      populatedUsers.push(populatedUser)
    }

    response.json(populatedUsers)
  } catch (error) {
    response.status(500).json({ error: 'Error retrieving users' })
  }
})






module.exports = usersRouter
