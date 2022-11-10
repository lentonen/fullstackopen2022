const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { request, response } = require('../app')
const Blog =require('../models/blog')
const User = require('../models/users')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})
  

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = getTokenFrom(request)
  let decodedToken
  try {
    decodedToken = jwt.verify(token, process.env.secret)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
  } catch (error) {
    next(error)
  }
 

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    id: body.id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  if (typeof blog.title !== 'undefined' && typeof blog.url !== 'undefined') {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
  else {
    response.status(400).end()
  } 
})


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}


blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


blogsRouter.put('/:id', async (request, response) => {
  const handleError = (err) => {
    response.status(400)
  }
  
  const body = request.body
  const blog = {id: body.id, title: body.title, author: body.author, url: body.url, likes: body.likes}

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true, runValidators: true }).catch(handleError)
  response.json(updatedBlog)

 
})

module.exports = blogsRouter