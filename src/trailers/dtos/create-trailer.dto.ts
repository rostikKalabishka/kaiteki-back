import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateTrailerDto {
  @IsNumber()
  @Max(1000000)
  @Min(0)
  weight: number;

  @IsString()
  type: string;

  @IsString()
  trailerNumber: string;
}
