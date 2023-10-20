import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestInterface } from '../interfaces/request.interface';
import { NextFunction, Response } from 'express';
import * as process from 'process';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: RequestInterface, res: Response, next: NextFunction) {
    const requestAccessToken = req.cookies.accessToken;

    if (requestAccessToken) {
      try {
        req.user = this.jwtService.verify(requestAccessToken, { secret: process.env.ACCESS_SECRET_KEY });
        return next();
      } catch (error) {
        res.clearCookie('access_token');
        return res.status(401).json({ message: 'Invalid token' });
      }
    }
    return next();
  }
}
