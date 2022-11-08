const blogsRouter = require('express').Router()
const { request, response } = require('../app')
const Blog =require('../models/blog')
const User = require('../models/users')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})
  

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne()

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
    console.log(savedBlog._id)
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
  else {
    response.status(400).end()
  } 
})


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