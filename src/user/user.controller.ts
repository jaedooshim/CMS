import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { IMessage } from '../_common/interfaces/IMessage';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  /* 회원가입 */
  @Post()
  @HttpCode(201)
  async create(@Body() userData: CreateUserDto): Promise<IMessage> {
    return await this.userService.create(userData);
  }
}
