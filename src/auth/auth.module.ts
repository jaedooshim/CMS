import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './guard/passport.jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
