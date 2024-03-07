import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateTrackDto {
  @IsString({ message: 'Виробник має бути рядком' })
  make: string;
  @IsString({ message: 'Модель має бути рядком' })
  carModel: string;

  @IsNumber({}, { message: 'Вага має бути числом' })
  @Max(1000000, { message: 'Вага має бути до 1000000' })
  @Min(1, { message: 'Вага має бути бути не менше 1' })
  weight: number;

  @Max(1000, { message: 'Витрати на паливо мають бути до 1000' })
  @Min(1, { message: 'Витрати на паливо мають бути не менше 1' })
  @IsNumber({}, { message: 'Витрати на паливо мають бути числом' })
  fuelCosts: number;

  @Max(100000, { message: 'Об`єм бензобаку має бути не більше 100000' })
  @Min(10, { message: 'Об`єм бензобаку має бути не менше 10' })
  @IsNumber({}, { message: 'Об`єм бензобаку має бути число' })
  gasolineTankCapacity: number;

  @IsString({ message: 'Номера автомобіля мають бути рядком' })
  trackNumber: string;
}
