import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Track } from 'src/tracks/schemas/track.schema';
import { Trailer } from 'src/trailers/schemas/trailer.schemas';
import { Status } from 'src/types';
import { User } from 'src/users/schemas/user.schemas';

export class CreateFlightDto {
  @IsString()
  from: string;

  @IsString()
  to: string;

  @IsOptional()
  @IsString()
  status?: Status;

  @IsNumber()
  distance: number;

  @IsString()
  companyName: string;
  @IsNotEmpty()
  driver: User;

  @IsNumber()
  price: number;

  @IsNotEmpty()
  track: Track;

  @IsNotEmpty()
  trailer: Trailer;
}
