import { IsNumber, IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'mongoose';
import { Track } from 'src/tracks/schemas/track.schema';
import { Trailer } from 'src/trailers/schemas/trailer.schemas';
import { User } from 'src/users/schemas/user.schemas';

export class FlightFilterDto {
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

  @IsOptional()
  track?: Track;

  @IsOptional()
  trailer?: Trailer;

  @IsOptional()
  @IsString()
  field?: string;

  @IsOptional()
  @IsString()
  order?: SortOrder;
}
