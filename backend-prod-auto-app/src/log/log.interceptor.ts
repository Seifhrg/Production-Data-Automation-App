import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingService } from './log.service';
import { Users } from '@prisma/client';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user?: Users;
}

@Injectable()
export class TransactionLoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: RequestWithUser = context.switchToHttp().getRequest();
    const { method, originalUrl, user } = request;
    console.log('User in logging interceptor:', user);

    return next.handle().pipe(
      tap(async () => {
        const response = context.switchToHttp().getResponse();
        const { statusCode } = response;

        await this.loggingService.createLog(
          'HTTP Request',
          'request',
          null,
          user ? user.id : null,
          method,
          originalUrl,
          statusCode,
        );
      }),
    );
  }
}
