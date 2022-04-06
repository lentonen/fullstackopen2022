const blogsRouter = require('express').Router()
const { request, response } = require('../app')
const Blog =require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
  

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    id: body.id,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  if (typeof blog.title !== 'undefined' && typeof blog.url !== 'undefined') {
    const result = await blog.save()
    response.status(201).json(result)
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