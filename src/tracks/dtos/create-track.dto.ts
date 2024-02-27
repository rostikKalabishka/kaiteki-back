import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  make: string;
  @IsString()
  brand: string;

  @IsNumber()
  @Max(1000000)
  @Min(0)
  weight: number;

  @Max(1000000)
  @Min(0)
  @IsNumber()
  fuelCosts: number;

  @Max(1000000)
  @Min(0)
  @IsNumber()
  gasolineTankCapacity: number;

  @IsString()
  trackNumber: string;
}
