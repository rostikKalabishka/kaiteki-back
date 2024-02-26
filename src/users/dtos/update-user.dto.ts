import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/types';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  role?: Role;

  @IsOptional()
  @IsString()
  password?: string;
}
