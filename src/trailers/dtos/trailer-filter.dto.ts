import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class TrailerFilterDto {
  @IsOptional()
  @IsNumber({}, { message: 'Вага має бути числом' })
  @Max(1000000, { message: 'Вага має бути до 1000000' })
  @Min(1, { message: 'Вага мабути бути не менше 1' })
  weight?: number;

  @IsOptional()
  @IsString({ message: 'Тип прицепу має бути рядком' })
  type?: string;

  @IsOptional()
  @IsString({ message: 'Номера автомобіля мають бути рядком' })
  trailerNumber?: string;
}