const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/users')

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

describe('User api tests for username', () => {

  test('empty username returns 400 Bad request', async () => {
    const user = {
      username: '',
      name: 'testUser',
      password: 'testPassword'
    }
      
    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    expect(result.body.error).toContain('username is required.')
        
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

  test('too short username returns 400 Bad request', async () => {
    const user = {
      username: 't',
      name: 'testUser',
      password: 'testPassword'
    }
      
    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
        
    expect(result.body.error).toContain('username is shorter than the minimum allowed length (3).')
    
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

  test('three digit username is accepted', async () => {
    const user = {
      username: 'tst',
      name: 'testUser',
      password: 'testPassword'
    }
    
    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1 )
  })

  test('user is not accepted if same username already exists in DB', async () => {
    const user = {
      username: 'testuser1',
      name: 'testUser',
      password: 'testPassword'
    }
    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()  
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })
})

describe('User api tests for password', () => { 

  test('empty password returns 400 Bad request', async () => {
    const user = {
      username: 'test',
      name: 'testUser',
      password: ''
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    expect(result.body.error).toContain('password must be more than 3 digits')  
        
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

  test('too short password returns 400 Bad request', async () => {
    const user = {
      username: 'test',
      name: 'testUser',
      password: 'ps'
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)

    expect(result.body.error).toContain('password must be more than 3 digits')
        
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

  test('three digit password is accepted', async () => {
    const user = {
      username: 'test',
      name: 'testUser',
      password: 'tpw'
    }
    
    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1 )
  })
})

afterAll(() => {
  mongoose.connection.close()
})