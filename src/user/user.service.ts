import { HttpException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { MessageInterface } from '../_common/interfaces/message.interface';
import * as bcrypt from 'bcrypt';
import { UpdateuserDto } from './dto/updateuser.dto';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';
import { TokenInterface } from '../_common/interfaces/token.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  /* 회원가입 */
  async create(userData: CreateUserDto): Promise<MessageInterface> {
    const { email, tel } = userData;
    // 이메일 중복검증
    const existingEmail = await this.userRepository.findOne({ where: { email } });
    if (existingEmail) throw new HttpException('이미 사용중인 이메일입니다. 새로운 이메일을 입력해주세요.', 403);
    // 전화번호 중복검증
    const existingTel = await this.userRepository.findOne({ where: { tel } });
    if (existingTel) throw new HttpException('이미 등록된 전화번호입니다. 다시 한번 확인해주세요.', 403);
    // 비밀번호 암호화
    userData.password = await bcrypt.hash(userData.password, 10);
    const newUser = this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return { message: '회원가입이 완료되었습니다.' };
  }

  /* 모든 유저 조회 */
  async findAll(): Promise<User[] | undefined> {
    return await this.userRepository.find();
  }

  /* 특정 유저 조회 */
  async findOne(id: number): Promise<User> {
    // console.log(id);
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new HttpException('사용자를 찾을 수 없습니다.', 403);
    return user;
  }

  /* 회원 정보 수정 */
  async update(id: number, email: string, address: string, subAddress: string): Promise<TokenInterface> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('회원이 존재하지 않습니다.');
    }
    if (email !== user.email) {
      const existingEmail = await this.userRepository.findOne({ where: { email } });
      if (existingEmail) {
        throw new NotFoundException('이미 사용중인 이메일입니다.');
      }
    }
    user.email = email;
    user.address = address;
    user.subAddress = subAddress;

    const updateUser = await this.userRepository.save(user);
    const payload = {
      id: updateUser.id,
      email: updateUser.email,
      address: updateUser.address,
      subAddress: updateUser.subAddress,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME,
        secret: process.env.ACCESS_SECRET_KEY,
      }),
      message: '회원 정보가 수정되었습니다.',
    };
  }

  /* 회원 탈퇴 */
  async delete(userId: number, requestId: number): Promise<MessageInterface> {
    if (userId !== requestId) {
      throw new UnauthorizedException('권한이 없습니다.');
    }
    const existingUser = await this.userRepository.findOne({ where: { id: userId } });
    if (!existingUser) {
      throw new NotFoundException('존재하지 않는 회원입니다.');
    }
    await this.userRepository.softDelete(userId);
    return { message: '정상적으로 처리되었습니다.' };
  }
}
