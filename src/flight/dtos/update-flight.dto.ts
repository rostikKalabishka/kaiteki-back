import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Track } from 'src/tracks/schemas/track.schema';
import { Trailer } from 'src/trailers/schemas/trailer.schemas';
import { User } from 'src/users/schemas/user.schemas';

export class UpdateFlightDto {
  @IsOptional()
  @IsString()
  from?: string;

  @IsOptional()
  @IsString()
  to?: string;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  driver?: User;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsNumber()
  distance?: number;

  @IsOptional()
  track?: Track;

  @IsOptional()
  trailer?: Trailer;
}
