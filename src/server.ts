import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import winston from 'winston';
import familyRoutes from './routes/familyRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { connectDB } from './config/db.js';
import { inject } from "@vercel/analytics"
import morgan from 'morgan';
import fs from 'fs';

dotenv.config();
inject();

const app = express();
const PORT = process.env.PORT || 5500;

// Logger 설정
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.json(),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
      return JSON.stringify({
        timestamp,
        level,
        message,
        ...meta
      });
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} ${level}: ${message}`;
        })
      )
    }),
    new winston.transports.File({
      filename: 'logs/combined.log',
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ]
});

// 로그 디렉토리가 없으면 생성
const dir = 'logs';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// Morgan 미들웨어 설정
const morganMiddleware = morgan((tokens, req, res) => {
  return [
    '\n🔥 ',
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '- ',
    tokens['response-time'](req, res),
    'ms',
  ].join(' ');
});

// middleware
const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [
  'http://localhost:8081',
];
app.use(cors({origin: allowedOrigins, credentials: true}));
app.use(express.json());

// API 요청/응답 로깅 미들웨어
app.use((req, res, next) => {
  // 요청 로깅
  logger.info('API Request', {
    method: req.method,
    url: req.url,
    query: req.query,
    body: req.body,
    headers: req.headers,
    timestamp: new Date().toISOString()
  });

  // 응답 로깅을 위해 res.send 메서드를 래핑
  const originalSend = res.send;
  res.send = function(body) {
    logger.info('API Response', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      responseBody: body,
      timestamp: new Date().toISOString()
    });
    return originalSend.call(this, body);
  };

  next();
});

// Connect MongoDB
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
  logger.error('에러 메시지');
  logger.warn('경고 메시지');
  logger.info('정보 메시지');
  logger.debug('디버그 메시지');
});
