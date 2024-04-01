import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SessionUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    // Check if the request is for the login route
    if (request.originalUrl === '/api/v1/auth/login') {
      if (!request.session || !request.session.user) {
        return next.handle();
      } else {
        response.redirect('/api/v1/auth/test');
      }
    } else {
      if (!request.session || !request.session.user) {
        response.redirect('/api/v1/auth/login');
      } else {
        return next.handle();
      }
    }
  }
}
