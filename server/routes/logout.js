import express from 'express';
import logout from '../controllers/logout.js';


const logoutRoute = express.Router('/')

logoutRoute.get('/', logout);

export default logoutRoute