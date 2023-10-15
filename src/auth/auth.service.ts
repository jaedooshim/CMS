import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/user.dto';
import * as process from 'process';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async login(email: string, password: string): Promise<{ accessToken: string } | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('Unauthorized', 403);
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpException('Unauthorized', 403);
    }
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      subAddress: user.subAddress,
      tel: user.tel,
    };
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME,
        secret: process.env.ACCESS_SECRET_KEY,
      }),
    };
  }
}
