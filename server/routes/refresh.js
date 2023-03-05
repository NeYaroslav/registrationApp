import express from 'express';
import refresh from '../controllers/refresh.js';

const refreshRoute = express.Router('/')

refreshRoute.get('/', refresh)

export default refreshRoute