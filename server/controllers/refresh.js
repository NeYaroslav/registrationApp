import jwt from 'jsonwebtoken';

export default (req, res) => {
  const {jwt: refreshToken} = req.cookies
  if(refreshToken == undefined || refreshToken.length === 0) return res.sendStatus(401)
  
  try {
    const {id} = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    if(id == undefined) throw new Error("invalid token")
    
    const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: +process.env.ACCESS_EXPIRES_IN })
    res.status(200).json({accessToken})
  } catch (error) {
    res.clearCookie('jwt', { httpOnly: true, maxAge: +process.env.REFRESH_EXPIRES_IN *1000 })
    res.status(400).json({ message: 'refresh token error', error })
  }
}