import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

class UpdateuserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Matches(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i)
  email: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  subAddress: string;
}
export { UpdateuserDto };
