const blogsRouter = require('express').Router()
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
    console.log('if')
    const result = await blog.save()
    response.status(201).json(result)
  }
  else {
    console.log('else')
    response.status(400).end()
  } 
})

module.exports = blogsRouter