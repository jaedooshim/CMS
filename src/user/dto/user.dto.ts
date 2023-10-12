import { IsEmail, IsNotEmpty, IsString, matches, Matches, MaxLength, MinLength } from 'class-validator';

class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(4)
  @MinLength(2)
  @Matches(/[가-힣]/)
  name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Matches(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(16)
  @MinLength(8)
  @Matches(/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])/)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(13)
  @Matches(/^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/)
  tel: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  subAddress: string;
}
export { CreateUserDto };
