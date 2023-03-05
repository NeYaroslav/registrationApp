import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { loginRoute, refreshRoute, registerRoute, logoutRoute } from "./routes/index.js"
import { createUsersTable, createRefreshTokensTable } from './database/createTables.js';
import { validateAccessToken } from './middleware/index.js';

dotenv.config();

const app = express();
// !Middleware
app.use(express.json());
app.use(cookieParser());
// !Routes
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/refresh', refreshRoute);
app.use('/logout', logoutRoute);

// !Middleware for protected routes
app.use(validateAccessToken)
// !Protected routes
app.get('/cars',(req, res) => {
  res.json('success')
})

app.listen(process.env.PORT, async () => {
  await createUsersTable()
  await createRefreshTokensTable()
  console.log(`server is live on ${process.env.PORT}`);
});
