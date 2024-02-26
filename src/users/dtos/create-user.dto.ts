import { IsEmail, IsString, MinLength } from 'class-validator';
import { Role } from 'src/types';
export class CreateUserDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  @IsString()
  password: string;

  @IsString()
  role: Role;
}
