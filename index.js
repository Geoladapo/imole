import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ragRoutes from './routes/ragRoutes.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', ragRoutes);

app.get('/', (req, res) => res.send('Hello from Imole!'));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});