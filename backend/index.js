import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import deviceRouter from "./routes/deviceRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use('/api/user',userRouter);

app.use('/api/devices',deviceRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})