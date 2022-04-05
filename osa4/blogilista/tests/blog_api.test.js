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

describe('Viewing blogs', () => {

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })


  test('identification is defined as id', async () => {
    const response = await api.get('/api/blogs')
    const firstBlog = response.body[0]

    expect(firstBlog.id).toBeDefined()
  })

})

describe('POST request tests', () => {


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


  test('blog with missing title field is not added"', async () => {
    const newBlogWithoutTitle = {
      id: '100',
      author: 'Ernie Empty',
      url: 'https://empty.com/',
    }

    await api
      .post('/api/blogs')
      .send(newBlogWithoutTitle)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })


  test('blog with missing url field is not added"', async () => {
    const newBlogWithoutUrl = {
      id: '100',
      title: 'Book with empty likes',
      author: 'Ernie Empty'
    }

    await api
      .post('/api/blogs')
      .send(newBlogWithoutUrl)
      .expect(400)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })


  test('blog with missing title and url fields is not added"', async () => {
    const newBlogWithoutTitleAndUrl = {
      id: '100',
      author: 'Ernie Empty'
    }

    await api
      .post('/api/blogs')
      .send(newBlogWithoutTitleAndUrl)
      .expect(400)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('blog with title and url fields only is added', async () => {
    const newBlogWithoutTitle = {
      title: 'Test book title',
      url: 'https://empty.com/'
    }

    await api
      .post('/api/blogs')
      .send(newBlogWithoutTitle)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })
})


describe('Deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length-1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})
