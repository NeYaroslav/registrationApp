import { insertUser } from '../database/auth.js'
import bcrypt from 'bcrypt'

export default async (req, res, next) => {
  const { username, name, password } = req.body;
  if(username == undefined || name == undefined || password == undefined) {
    return res.status(400).json({ message: 'username, name, password fields are required' });
  }

  let hashedPassword = null;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    return res.status(500).json({ message: 'An Error occured when was trying to hash the password', error });
  }

  try {
    await insertUser(username, name, hashedPassword);
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Something wrong with sql request', error });
  }
}