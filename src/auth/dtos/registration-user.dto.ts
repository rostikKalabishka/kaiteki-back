import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from 'src/types';

export class RegistrationUserDto {
  @IsString({ message: 'Повне ім`я має бути рядком' })
  fullName: string;

  @IsEmail({}, { message: 'Невірна адреса електронної пошти' })
  email: string;

  @MinLength(8, {
    message: 'Мінімальна довжина паролю повинна бути 8 символів',
  })
  @IsString({ message: 'Пароль має бути рядком' })
  password: string;

  @IsOptional()
  @IsString({ message: 'Роль має бути рядком' })
  role?: Role;
}
