import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import multer from 'multer';
import cors from 'cors';
import connectDB from './config/db.js';
import {
  registerUser,
  loginUser,
  getPhotos,
  getUser,
} from './controllers/userController.js';
import { uploadFiles } from './controllers/uploadFilesController.js';
import { protect } from './middleware/authMiddleware.js';

dotenv.config();
connectDB();

const app = express();

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');

app.use(cors());
app.use(express.json());

app.post('/login', loginUser);
app.post('/register', registerUser);
app.get('/auth', protect, getUser);
app.post('/upload', protect, multerUploads, uploadFiles);
app.get('/photos', protect, getPhotos);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
