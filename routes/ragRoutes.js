import express from 'express';
import { generateResponse } from '../controllers/ragController.js';

const router = express.Router();

router.post('/generate', generateResponse);

export default router;