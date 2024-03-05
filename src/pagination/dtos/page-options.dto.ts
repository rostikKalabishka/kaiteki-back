import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { SortOrder } from 'src/types';

export class PageOptionsDto {
  // @IsEnum(Order)
  @IsOptional()
  readonly order?: SortOrder = 'desc';

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly size?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.size;
  }
}
