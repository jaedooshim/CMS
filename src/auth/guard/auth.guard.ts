// import { CanActivate, Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
//
// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor() {}
//
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     if (!request.user) throw new UnauthorizedException('로그인이 필요합니다.');
//
//     return true;
//   }
// }
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException('로그인이 필요합니다.');
    }
    return user;
  }
}
