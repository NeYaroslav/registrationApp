import jwt from 'jsonwebtoken';
import { removeRefrexhToken } from '../database/auth.js';

export default async (req, res) => {
  const {jwt: refreshToken} = req.cookies
  if(refreshToken == undefined || refreshToken.length === 0) return res.sendStatus(401)

  res.clearCookie('jwt', { httpOnly: true, maxAge: +process.env.REFRESH_EXPIRES_IN * 1000 })
  
  let userId = null
  try {
    const {id} = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    if(id == undefined) throw new Error("invalid token")
    userId = id
  } catch (error) {
    res.status(400).json({ message: 'refresh token error', error })
  }

  try {
    await removeRefrexhToken(userId)
    res.sendStatus(204)
  } catch (error) {
    res.status(500).json({ message: 'could\'t remove from database', error })
  }
}