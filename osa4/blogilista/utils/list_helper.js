let _ = require('lodash')

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


const mostBlogs = (blogs) => {
  const authorsWithBlogCount = _.countBy(blogs, 'author')     // Creates object where key=author & value=blogs
  let listOfAuthorsWithBlogCount = mapAuthorsWithBlogCountToList(authorsWithBlogCount)
  sortByBlogCount(listOfAuthorsWithBlogCount)
  const authorWithMostBlogs = listOfAuthorsWithBlogCount[0]
  
  return blogs.length === 0                                   // Return empty list if given list is empty
    ? []
    : authorWithMostBlogs                  
}


const mostLikes = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, 'author')
  const listOfAuthorsWithLikes = mapAuthorsWithLikesToList(blogsByAuthor)
  sortByLikes(listOfAuthorsWithLikes)

  const authorWithMostLikes = listOfAuthorsWithLikes[0]
  return blogs.length === 0 
    ? []
    : authorWithMostLikes

}


const mapAuthorsWithBlogCountToList = (authors) => {
  let authorsWithBlogCount = []
  for (const [key, value] of Object.entries(authors)) { 
    const currentAuthor = {author:key, blogs:value}
    authorsWithBlogCount.push(currentAuthor)
  }
  return authorsWithBlogCount
}


const mapAuthorsWithLikesToList = (blogsByAuthor) => {
  let authorsWithLikes = []
  for (const [author, blogs] of Object.entries(blogsByAuthor)) {
    const likes = countLikes(blogs)
    const currentAuthor = {author: author, likes: likes}
    authorsWithLikes.push(currentAuthor)
  }
  return authorsWithLikes
}


const sortByBlogCount = (listOfAuthorsWithBlogCount) => {
  listOfAuthorsWithBlogCount.sort((a,b) => {         
    return b.blogs - a.blogs  
  }) 
}


const sortByLikes = (listOfAuthorsWithLikes) => {
  listOfAuthorsWithLikes.sort((a,b) => {         
    return b.likes - a.likes  
  }) 
}

const countLikes = (blogs) => {
  let likes = 0
  blogs.forEach((blog) => {
    likes += blog.likes
  })
  return likes
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
