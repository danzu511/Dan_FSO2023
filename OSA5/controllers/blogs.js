const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor
const mongoose = require('mongoose')
//userExtractoria käytetään nyt vain POST-pyynnöissä ja DELETE/ title pyynnöissä.
//Jos app.js käyttää app.use(middleware.userExtractor), niin silloin se vaaditaan Get-pyyntöön myös.
//Eli toisinsanoen en voinut selaimella tarkastaa Get-pyynnöllä, talletettuja blogeja, koska se vaati kirjautumisen.

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
  } catch (error) {
    response.status(500).json({ error: 'Error retrieving blogs' })
  }
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { title, author, likes, url } = request.body
  const { user } = request

  if (!title || !url) {
    return response.status(400).json({ error: 'Title and URL are required' })
  }

  const blog = new Blog({
    title,
    author,
    likes,
    url,
    user: user._id,
  })

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    console.log('Error creating a blog: ', error.message)
    response.status(400).json({ error: 'Error creating a blog' })
  }
})


blogsRouter.delete('/:identifier', userExtractor, async (request, response) => {
  const { identifier } = request.params
  const { user } = request

  let query

  if (mongoose.Types.ObjectId.isValid(identifier)) {
    // If the identifier is a valid ObjectId, delete the blog by _id
    query = { _id: identifier, user: user._id }
  } else {
    // If the identifier is not a valid ObjectId, delete the blog by title
    query = { title: identifier, user: user._id }
  }

  try {
    // Check if the blog exists and if the user is the creator of the blog
    const deletedBlog = await Blog.findOne(query)
    if (!deletedBlog) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    if (deletedBlog.user.toString() !== user._id.toString()) {
      return response.status(401).json({ error: 'Unauthorized to delete this blog' })
    }

    // Find the blog by its identifier (title or _id) and delete it
    await Blog.findOneAndDelete(query)
    response.status(200).json({ message: 'Blog deleted successfully' })
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'Internal server error' })
  }
})




blogsRouter.delete('/', async (request, response) => {
  try {
    await Blog.deleteMany({})
    response.status(200).json({ message: 'All blogs deleted successfully' })
  } catch (error) {
    response.status(500).json({ error: 'Error deleting blogs' })
  }
})

blogsRouter.put('/:identifier', async (request, response) => {
  const { identifier } = request.params
  const { likes } = request.body
  console.log('identifier:', identifier)
  console.log('likes:', likes)

  if (!likes) {
    return response.status(400).json({ error: 'Likes is required' })
  }

  try {
    let blog

    if (mongoose.Types.ObjectId.isValid(identifier)) {
      // If the identifier is a valid ObjectId, find the blog by _id
      blog = await Blog.findById(identifier)
    } else {
      console.log('not valid ObjectId')
      // If the identifier is not a valid ObjectId, find the blog by title
      blog = await Blog.findOne({ title: identifier })
    }

    if (!blog) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    // Update the likes of the blog
    blog.likes = likes
    await blog.save()

    response.status(200).json({ message: 'Blog likes updated successfully' })
  } catch (error) {
    console.error(error)
    response.status(500).json({ error: 'Internal server error' })
  }
})



module.exports = blogsRouter
