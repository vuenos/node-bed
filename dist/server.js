import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import winston from 'winston';
import familyRoutes from './routes/familyRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { connectDB } from './config/db.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5500;
// middleware
const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [
    'http://localhost:8081',
];
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
// Connect MongoDB
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log' }),
    ],
});
connectDB();
// mongoose
//   .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wayapp')
//   .then(() => console.log('MongoDB 연결 성공'))
//   .catch(err => logger.error('MongoDB 연결 실패:', err));
// set route
app.use('/api/v1/family', familyRoutes);
app.use(errorHandler);
// 서버 시작
app.listen(PORT, () => {
    console.log(`🚀 서버가 포트 ${PORT}에서 실행 중`);
});
