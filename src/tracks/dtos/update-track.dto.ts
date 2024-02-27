import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateTrackDto {
  @IsOptional()
  @IsString()
  make?: string;
  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsNumber()
  @Max(1000000)
  @Min(0)
  weight?: number;

  @IsOptional()
  @Max(1000000)
  @Min(0)
  @IsNumber()
  fuelCosts?: number;

  @IsOptional()
  @Max(1000000)
  @Min(0)
  @IsNumber()
  gasolineTankCapacity?: number;

  @IsString()
  trackNumber?: string;
}
