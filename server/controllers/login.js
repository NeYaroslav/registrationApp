import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUsersByUsername, setRefreshToken } from "../database/auth.js";

export default async (req, res) => {
  const { username, password } = req.body
  if(username == undefined || password == undefined) {
    return res.status(400).json({ message: 'username, password fields are required' });
  }
  
  let foundUser = null;
  try {
    [foundUser] = await findUsersByUsername(username)
    if(foundUser?.id == undefined) throw new Error("no users found")
  } catch (error) {
    return res.status(400).json({ message: 'wrong username, password combination', error });
  }

  let arePasswordsEqual = null
  try {
    arePasswordsEqual = await bcrypt.compare(password, foundUser.password)
  } catch (error) {
    return res.status(500).json({ message: 'something went wrong', error });
  }

  if(arePasswordsEqual !== true) {
    return res.status(400).json({ message: 'wrong username, password combination' });
  }
  const accessToken = jwt.sign({ id: foundUser.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: +process.env.ACCESS_EXPIRES_IN })
  const refreshToken = jwt.sign({ id: foundUser.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: +process.env.REFRESH_EXPIRES_IN })

  try {
    await setRefreshToken(foundUser.id, refreshToken)
    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: +process.env.REFRESH_EXPIRES_IN * 1000 })
    res.status(200).json({accessToken })
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
}