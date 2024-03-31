import { Injectable, NestMiddleware, Session } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoginCheckerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');

    next();
  }
}
