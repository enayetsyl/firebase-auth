import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import AppError from './shared/AppError';

const app: Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Application Routes
app.use('/api/v1', router);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// Global Error Handler (Basic)
app.use((err: any, req: Request, res: Response, next: express.NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
});

// Not Found Handler
app.use((req: Request, res: Response, next: express.NextFunction) => {
  res.status(404).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
});

export default app;
