import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './log.service';

@Injectable()
export class HttpLoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    res.on('finish', async () => {
      const { statusCode } = res;
      await this.loggingService.createLog(
        'HTTP Request',
        'request',
        null,
        null, // Replace with actual user ID if available
        method,
        originalUrl,
        statusCode,
      );
    });
    next();
  }
}
