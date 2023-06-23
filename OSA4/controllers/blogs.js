const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor
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


blogsRouter.delete('/:title', userExtractor, async (request, response) => {
  const { title } = request.params
  const { user } = request
  if (!title) {
    return response.status(400).json({ error: 'Title is required' })
  }

  // Check if the blog exists and if the user is the creator of the blog
  const deletedBlog = await Blog.findOne({ title, user: user._id })
  if (!deletedBlog) {
    return response.status(404).json({ error: 'Blog not found' })
  }
  if (deletedBlog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'Unauthorized to delete this blog' })
  }

  // Find the blog by its title and delete it
  await Blog.findOneAndDelete({ title, user: user._id })
  response.status(200).json({ message: 'Blog deleted successfully' })
})



blogsRouter.delete('/', async (request, response) => {
  try {
    await Blog.deleteMany({})
    response.status(200).json({ message: 'All blogs deleted successfully' })
  } catch (error) {
    response.status(500).json({ error: 'Error deleting blogs' })
  }
})

blogsRouter.put('/:title', async (request, response) => {
  const { title } = request.params
  const { likes } = request.body

  if (!likes) {
    return response.status(400).json({ error: 'Likes is required' })
  }

  // Find the blog by its title
  const blog = await Blog.findOne({ title })

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  // Update the likes of the blog
  blog.likes = likes
  await blog.save()

  response.status(200).json({ message: 'Blog likes updated successfully' })
})


module.exports = blogsRouter
