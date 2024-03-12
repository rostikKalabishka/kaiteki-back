import { IsDateString, IsOptional } from 'class-validator';

export class StatsFilterDto {
  @IsOptional()
  @IsDateString()
  month?: string;
}
