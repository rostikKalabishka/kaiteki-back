import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Track } from 'src/tracks/schemas/track.schema';
import { Trailer } from 'src/trailers/schemas/trailer.schemas';
import { User } from 'src/users/schemas/user.schemas';

export class CreateFlightDto {
  @IsString()
  from: string;

  @IsString()
  to: string;

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
