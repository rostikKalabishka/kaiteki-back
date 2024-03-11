import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from 'src/types';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Повне ім`я має бути рядком' })
  fullName?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Невірна адреса електронної пошти' })
  email?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Заробітна палта за кілометр має бути числом' })
  @Type(() => Number)
  salaryPerOneKm: number;

  @IsOptional()
  @IsString({ message: 'Роль має бути рядком' })
  role?: Role;

  @IsOptional()
  @MinLength(8, {
    message: 'Мінімальна довжина паролю повинна бути 8 символів',
  })
  @IsString({ message: 'Пароль має бути рядком' })
  password?: string;
}
