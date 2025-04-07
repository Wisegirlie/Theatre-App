import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './server/routes/auth.routes.js'
import userRoutes from './server/routes/user.routes.js'
import eventRoutes from './server/routes/event.routes.js'
import ticketRoutes from './server/routes/ticket.routes.js'
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();

app.get('/', (req, res) => {
     res.json({ message: "Welcome to Theater Application." });
 });

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true, 
};

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())

app.use(authRoutes)
app.use(userRoutes)
app.use(eventRoutes)
app.use(ticketRoutes)

export default app