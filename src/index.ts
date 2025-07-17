import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import { authenticate } from './middleware/authMiddleware';

dotenv.config();
const app = express();

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/tasks', authenticate, taskRoutes);

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch(err => console.error(err));