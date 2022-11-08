const bcrypt = require('bcrypt')
const app = require('../app')
const { request } = require('../app')
const usersRouter = require('express').Router()
const User = require('../models/users')

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body
  if (password.length < 3) {
    return response.status(400).json({error: 'password must be more than 3 digits'})
  }
  
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({error: 'username must be unique'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  try {
    const saveduser = await user.save()
    response.status(201).json(saveduser)
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
  response.json(users)
})

module.exports = usersRouter