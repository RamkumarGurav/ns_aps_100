import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    if (!req.session || !req.session.user) {
      req.isAuthenticated = false;
    } else {
      req.isAuthenticated = true;
    }

    // if (req.originalUrl === '/api/v1/auth/login') {
    //   if (!req.session || !req.session.user) {
    //     req.isAuthenticated = false;
    //   } else {
    //     req.isAuthenticated = true;
    //   }
    // } else {
    //   if (!req.session || !req.session.user) {
    //     req.isAuthenticated = false;
    //   } else {
    //     req.isAuthenticated = false;
    //   }
    // }
    next();
  }
}
