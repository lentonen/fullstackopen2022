//var array = require('lodash/array')
//var object = require('lodash/fp/object')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.reduce((sum, order) => sum + order.likes, 0)
  return likes
}

const favoriteBlog = (blogs) => {
  let favoriteBlog = blogs[0]  
  blogs.forEach((blog) => {
    if (blog.likes > favoriteBlog.likes) favoriteBlog = blog
  })
  return blogs.length === 0
    ? []
    : favoriteBlog
}


module.exports = {
  dummy, totalLikes, favoriteBlog
}
