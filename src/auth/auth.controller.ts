import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() data: LoginDto, @Res() res: Response): Promise<Response> {
    const result = await this.authService.login(data.email, data.password);
    res.cookie('access_token', result.accessToken, { httpOnly: true });
    res.header('Authorization', 'Bearer ' + result.accessToken);
    return res.status(200).json(true);
  }
  @Get('/authenticate')
  @UseGuards(AuthGuard)
  isAuthenticated(@Req() req: Request): any {
    const user: any = req.user;
    return user;
  }
}
