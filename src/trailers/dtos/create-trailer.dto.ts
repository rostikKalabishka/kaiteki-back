import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateTrailerDto {
  @IsNumber({}, { message: 'Вага має бути числом' })
  @Max(1000000, { message: 'Вага має бути до 1000000' })
  @Min(1, { message: 'Вага має бути бути не менше 1' })
  weight: number;

  @IsString({ message: 'Тип прицепу має бути рядком' })
  type: string;

  @IsString({ message: 'Номера автомобіля мають бути рядком' })
  trailerNumber: string;
}
