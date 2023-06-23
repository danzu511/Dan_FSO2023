const dummy = (blogs) => blogs.length

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) => {
  const maxLikes = blogs.reduce((max, blog) => {
    if (blog.likes > max.likes) {
      return blog
    }
    return max
  }, blogs[0]) // Initialize max with the first blog object

  const favoriteBlogs = blogs.filter((blog) => blog.likes === maxLikes.likes)
  return favoriteBlogs
}

const mostBlogs = (blogs) => {
  const authorCounts = blogs.reduce((counts, blog) => {
    const newCount = counts
    newCount[blog.author] = (newCount[blog.author] || 0) + 1
    return newCount
  }, {})

  const maxCount = Math.max(...Object.values(authorCounts))
  const authorsWithMaxBlogs = Object.entries(authorCounts)
    .filter(([author, count]) => count === maxCount)
    .map(([author, blogs]) => ({ author, blogs }))

  return authorsWithMaxBlogs
}

const mostLikes = (blogs) => {
  const authorLikes = blogs.reduce((likes, blog) => {
    const newLikes = likes
    newLikes[blog.author] = (newLikes[blog.author] || 0) + blog.likes
    return newLikes
  }, {})

  const maxLikes = Math.max(...Object.values(authorLikes))
  const authorsWithMaxLikes = Object.entries(authorLikes)
    .filter(([author, likes]) => likes === maxLikes)
    .map(([author, likes]) => ({ author, likes }))

  return authorsWithMaxLikes
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes,
}
