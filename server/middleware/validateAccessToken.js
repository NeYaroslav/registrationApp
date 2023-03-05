import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  const authToken = req.headers.authorization
  const accessToken = authToken?.split(' ')[1]
  if(authToken == undefined || authToken.length === 0) return res.sendStatus(401)

  try {
    const {id} = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    if(id == undefined) throw new Error()
    req.userId = id
    next()
  } catch (error) {
    return res.sendStatus(403)
  }
}