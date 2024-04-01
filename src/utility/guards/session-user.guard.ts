import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class SessionUserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    // // Check if the request is for the login route
    // if (request.originalUrl === '/api/v1/auth/login') {
    //   if (!request.session || !request.session.user) {
    //     request.isAuthenticated = false;
    //   } else {
    //     request.isAuthenticated = false;
    //   }
    // } else {
    //   if (!request.session || !request.session.user) {
    //     request.isAuthenticated = false;
    //   } else {
    //     request.isAuthenticated = false;
    //   }
    // }

    if (request.session && request.session.user) {
      request.isAuthenticated = true;
      return true;
    } else {
      request.isAuthenticated = false;
      return true;
    }
  }
}
