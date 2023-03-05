import express from 'express'
import login from '../controllers/login.js'
import register from '../controllers/register.js'

const registerRoute = express.Router('/')

registerRoute.post('/', register, login)

export default registerRoute