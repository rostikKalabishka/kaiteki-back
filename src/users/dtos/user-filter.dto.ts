import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
import { SortOrder } from 'mongoose';

export class UserFilterDto {
  @IsOptional()
  @IsString({ message: 'Повне ім`я має бути рядком' })
  fullName?: string;

  @IsOptional()
  @IsString({ message: 'Email має бути рядком' })
  email?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Ціна має бути числом' })
  @Type(() => Number)
  @Max(1000, { message: 'Ціна має бути до 1000' })
  @Min(0, { message: 'Ціна має бути бути не менше 1' })
  salaryPerOneKm?: number;

  @IsOptional()
  @IsString()
  field?: string;

  @IsOptional()
  @IsString()
  order?: SortOrder;
}
