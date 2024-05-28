import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingService } from './log.service';

@Injectable()
export class TransactionLoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, originalUrl, user } = request;

    return next.handle().pipe(
      tap(async (data) => {
        if (data && data.action && data.entity && data.entityId) {
          await this.loggingService.createLog(
            data.action,
            data.entity,
            data.entityId,
            user ? user.id : null,
            method,
            originalUrl,
            context.switchToHttp().getResponse().statusCode,
          );
        }
      }),
    );
  }
}
