import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './log.service';
import { Users } from '@prisma/client';

interface RequestWithUser extends Request {
  user?: Users;
}

@Injectable()
export class ConditionalLoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: RequestWithUser, res: Response, next: NextFunction) {
    const { method, originalUrl, user } = req;

    // Skip logging for login route and other excluded routes
    const excludedPaths = ['/auth/login', '/logs', '/transaction-history'];
    console.log('Request URL:', originalUrl); // Debugging log
    console.log('Excluded Paths:', excludedPaths); // Debugging log

    if (excludedPaths.some((path) => originalUrl.startsWith(path))) {
      console.log('Skipping logging for:', originalUrl); // Debugging log
      return next();
    }

    res.on('finish', async () => {
      const { statusCode } = res;
      await this.loggingService.createLog(
        'HTTP Request',
        'request',
        null,
        user ? user.id : null,
        method,
        originalUrl,
        statusCode,
      );
    });

    next();
  }
}
