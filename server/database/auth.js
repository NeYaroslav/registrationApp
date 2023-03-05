import pool from "./config.js";

/**
 * 
 * @param {string} username 
 * @param {string} name 
 * @param {string} password hashedPassword
 * @returns {number} insertId
 */
export const insertUser = async (username, name, password) => {
  const [response] = await pool.query(`
    insert into users(username, name, password) values(?, ?, ?)
  `,[username, name, password])
  return response.insertId
};
/**
 * 
 * @param {string} username
 * @returns {{username: string, name: string, password: string, id: number}[]}
 */
export const findUsersByUsername = async (username) => {
  const [response] = await pool.query(`
    select * from users where username = ?
  `, [username])
  return response
}

/**
 * 
 * @param {number} userId 
 * @param {string} token 
 * @returns {{ fieldCount:number, affectedRows: number, insertId: number,info: string, serverStatus: number, warningStatus: number }}
 */
export const setRefreshToken = async (userId, token) => {
  const [response] = await pool.query(`
    insert into refresh_tokens(user_id, token) values(?, ?)
    ON DUPLICATE KEY UPDATE token=?
  `, [userId, token, token])
  return response
}

/**
 * 
 * @param {number} userId 
 * @returns {{fieldCount: number,affectedRows: number,insertId: number,info: string,serverStatus: number,warningStatus: number}}
 */

export const removeRefrexhToken = async (userId) => {
  const [response] = await pool.query(`
    delete from refresh_tokens where user_id = ?
  `, [userId])
  return response
}