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
  const authors = _.countBy(blogs, 'author')            // Counts how many blogs each author has
  let listOfAuthors = []

  for (const [key, value] of Object.entries(authors)) { // Mapping author objects to list
    const currentAuthor = {author:key, blogs:value}
    listOfAuthors.push(currentAuthor)
  }

  listOfAuthors = listOfAuthors.sort((a,b) => {         // Sorting list by blog count. 
    return b.blogs - a.blogs                            // First item in the list is 
  })                                                    // the one with highest blog count

  return blogs.length === 0                             // Return empty list if given list is empty
    ? []
    : listOfAuthors[0]
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}
