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
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
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
  }
  catch (error) {
    next(error)
  }
})


blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if (blog === null) {
      return response.status(204).end()
    } else if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      return response.status(401).json({ error: 'Not allowed to delete' })
    }
  } catch(error) {
    next(error)
  }
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