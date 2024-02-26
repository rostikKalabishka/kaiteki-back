import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from 'src/types';

export class RegistrationUserDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  role?: Role;
}
