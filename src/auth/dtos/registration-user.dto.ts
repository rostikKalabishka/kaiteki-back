import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegistrationUserDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  @IsString()
  password: string;
}
