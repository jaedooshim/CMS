import { Body, Controller, Get, HttpCode, Param, Post, Req, Res, Patch, UseGuards, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { MessageInterface } from '../_common/interfaces/message.interface';
import { User } from './entity/user.entity';
import { RequestInterface } from '../_common/interfaces/request.interface';
import { Response } from 'express';
import { UpdateuserDto } from './dto/updateuser.dto';
import { JwtAuthGuard } from '../auth/guard/auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  /* 회원가입 */
  @Post()
  @HttpCode(201)
  async create(@Body() userData: CreateUserDto): Promise<MessageInterface> {
    return await this.userService.create(userData);
  }

  /* 모든 회원 조회 */
  @Get()
  async findAll(): Promise<User[] | undefined> {
    return await this.userService.findAll();
  }

  /* 특정 회원 조회 */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(Number(id));
  }

  /* 회원 정보 수정 */
  @Patch()
  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  async update(@Req() req: RequestInterface, @Res() res: Response, @Body() data: UpdateuserDto): Promise<Response> {
    const { id } = req.user;
    const { message, access_token } = await this.userService.update(id, data.email, data.address, data.subAddress);
    res.cookie('access_token', access_token, { httpOnly: true });
    return res.status(201).json({ message });
  }

  /* 회원 탈퇴 */
  @Delete(':id')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') userid: number, @Req() req: RequestInterface): Promise<MessageInterface> {
    // const { id: requestId } = req.user;
    // requestId가 string으로 나와서 Number로 지정
    const requestId = Number(req.user.id);
    console.log('userid:', userid);
    console.log('requestId:', requestId);
    return await this.userService.delete(userid, requestId);
  }
}
