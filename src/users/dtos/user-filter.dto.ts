import { IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'mongoose';

export class UserFilterDto {
  @IsOptional()
  @IsString({ message: 'Повне ім`я має бути рядком' })
  fullName?: string;

  @IsOptional()
  @IsString()
  field?: string;

  @IsOptional()
  @IsString()
  order?: SortOrder;
}
