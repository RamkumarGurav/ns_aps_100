import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

type ExtendedRequest = Request & { fullUrl: string; baseUrl: string };
@Injectable()
export class UrlCatcherMiddleware implements NestMiddleware {
  use(req: ExtendedRequest, res: Response, next: NextFunction) {
    const protocol = req.protocol;
    const host = req.get('host');

    const baseUrl = `${protocol}://${host}`;
    req.fullUrl = baseUrl + req.originalUrl; // Attach full URL to request object
    req.baseUrl = baseUrl; // Attach full URL to request object

    next();
  }
}
