import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { MessageInterface } from '../_common/interfaces/message.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
  /* 회원가입 */
  async create(userData: CreateUserDto): Promise<MessageInterface> {
    const { email, tel } = userData;
    /* 이메일 존재시 */
    const existingEmail = await this.userRepository.findOne({ where: { email } });
    if (existingEmail) throw new HttpException('이미 사용중인 이메일입니다. 새로운 이메일을 입력해주세요.', 403);
    /* 전화번호 존재시 */
    const existingTel = await this.userRepository.findOne({ where: { tel } });
    if (existingTel) throw new HttpException('이미 등록된 전화번호입니다. 다시 한번 확인해주세요.', 403);
    /* 비밀번호 암호화 */
    userData.password = await bcrypt.hash(userData.password, 10);
    const newUser = this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return { message: '회원가입이 완료되었습니다.' };
  }
}
