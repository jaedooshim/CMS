import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { MessageInterface } from '../_common/interfaces/message.interface';
import { User } from './entity/user.entity';

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
}
