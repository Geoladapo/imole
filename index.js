import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ragRoutes from './routes/ragRoutes.js';
import {connectDB} from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
connectDB()

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

app.use('/api', ragRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
