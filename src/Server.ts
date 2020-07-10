import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';

import express, { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './routes';
import logger from '@shared/Logger';

const APP_ERROR = 'app_error';

function setCriticalError(errorMsg: string): void {
  app.set(APP_ERROR, errorMsg);
  logger.error(errorMsg);
}

// Init express
const app = express();


// --- Set basic express settings ---

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

// Kill switch for critical errors (db connection failed, etc.)
app.use((req: Request, res: Response, next: NextFunction) => {
  if (app.get(APP_ERROR)) {
    return res.status(BAD_REQUEST).json({
      error: app.get(APP_ERROR),
    });
  } else {
    return next();
  }
});

// Add APIs
app.use('/api', BaseRouter);

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, err);
  return res.status(BAD_REQUEST).json({
    error: err.message,
  });
});


// --- Serve front-end content ---

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));


app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'))
});

// Export express instance
export default app;

export { setCriticalError };
