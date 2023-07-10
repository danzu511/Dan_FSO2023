const express = require('express')

const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

// MongoDB Atlas connection string
const mongoUrl = config.MONGODB_URI

// Connect to MongoDB Atlas
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    logger.info('Connected to MongoDB Atlas')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB Atlas:', error)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.extractTokenMiddleware)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
if (process.env.NODE_ENV === 'test') {
  console.log('NODE_ENV is test')
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}


module.exports = app
