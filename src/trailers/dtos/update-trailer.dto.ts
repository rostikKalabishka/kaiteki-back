import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateTrailerDto {
  @IsOptional()
  @IsNumber()
  @Max(1000000)
  @Min(0)
  weight?: number;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  trailerNumber?: string;
}
