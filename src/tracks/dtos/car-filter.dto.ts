import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { SortOrder } from 'src/types';

export class CarFilterDto {
  @IsOptional()
  @IsString()
  make?: string;

  @IsOptional()
  @IsString()
  carModel?: string;

  @IsOptional()
  @IsString()
  trackNumber?: string;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @IsNumber({}, { message: 'Вага має бути числом' })
  @Max(1000000, { message: 'Вага має бути до 1000000' })
  @Min(1, { message: 'Вага має бути бути не менше 1' })
  weight?: number;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @Max(1000, { message: 'Витрати на паливо мають бути до 1000' })
  @Min(1, { message: 'Витрати на паливо мають бути не менше 1' })
  @IsNumber({}, { message: 'Витрати на паливо мають бути числом' })
  fuelCosts?: number;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  @Max(100000, { message: 'Об`єм бензобаку має бути не більше 100000' })
  @Min(10, { message: 'Об`єм бензобаку має бути не менше 10' })
  @IsNumber({}, { message: 'Об`єм бензобаку має бути число' })
  gasolineTankCapacity?: number;

  @IsOptional()
  @IsString()
  field?: string;

  @IsOptional()
  @IsString()
  order?: SortOrder;
}
