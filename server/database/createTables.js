import pool from "./config.js";

export const createUsersTable = async () => {
  await pool.query(`
    create table if not exists users (
      id int not null auto_increment,
      name varchar(255) not null,
      username varchar(255) not null unique,
      password varchar(255) not null, 
      primary key(id)
    )
  `)
}

export const createRefreshTokensTable = async () => {
  await pool.query(`
    create table if not exists refresh_tokens(
      id int not null auto_increment,
      user_id int not null unique,
      token varchar(255) not null unique,
      primary key(id)
    )
  `,)
}