const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})


afterAll(() => {
  mongoose.connection.close()
})


test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})


test('identification is defined as id', async () => {
  const response = await api.get('/api/blogs')
  const firstBlog = response.body[0]

  expect(firstBlog.id).toBeDefined()
})


test('valid blog is added', async () => {
  const newBlog = {
    id: '12',
    title: 'Test book title',
    author: 'Test Author',
    url: 'https://example.com/',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
  
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)

  const titles = blogsAtEnd.map(blog => blog.title)
  expect(titles).toContain(
    'Test book title'
  )
})


test('blog with empty likes field is setting likes to zero', async () => {
  const newBlogWithEmptyLikes = {
    id: '100',
    title: 'Book with empty likes',
    author: 'Ernie Empty',
    url: 'https://empty.com/',
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithEmptyLikes)
    .expect(201)
  
  const blogsAtEnd = await helper.blogsInDb()
  const addedBlog = blogsAtEnd.filter(blog => blog.author==='Ernie Empty')
  expect(addedBlog[0].likes).toBe(0)

})
