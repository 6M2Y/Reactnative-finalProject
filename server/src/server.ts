import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import userRouter from './routes/userRoutes';
import upLoadRouter from './routes/uploadRoutes';
import locationRoute from './routes/locationRoutes';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.URL || '';

app.use(cors({
  origin: "*",  
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
}));

app.use('/uploads', express.static('uploads')); //serve static files from uploads directory
app.use('/api/upload', upLoadRouter); //upload routes

app.use(express.json()); //parse json request body


app.use('/api/auth', authRoutes); //auth routes
app.use('/api/tasks', taskRoutes); //task routes
app.use('/api/family', userRouter); //user routes
app.use('api/location', locationRoute) //location




mongoose
  .connect(MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
  })
  .catch(err => {
  console.error('MongoDB connection error:', err);
});

app.get('/', (req, res) => {
  res.send('FamilyFlow Server is running');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});