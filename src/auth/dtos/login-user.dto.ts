import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'Невірна адреса електронної пошти' })
  email: string;

  @MinLength(8, {
    message: 'Мінімальна довжина паролю повинна бути 8 символів',
  })
  @IsString({ message: 'Пароль має бути рядком' })
  password: string;
}
