import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Track } from 'src/tracks/schemas/track.schema';
import { Trailer } from 'src/trailers/schemas/trailer.schemas';
import { User } from 'src/users/schemas/user.schemas';

export type FlightDocument = Flight & Document;

@Schema({ timestamps: true })
export class Flight {
  @Prop({ required: true })
  from: string;
  @Prop({ required: true })
  to: string;
  @Prop({ required: true })
  companyName: string;

  @Prop()
  distance: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  driver: User;

  @Prop({ required: true })
  price: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Track.name,
  })
  track: Track;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Trailer.name,
  })
  trailer: Trailer;
}

export const FlightSchema = SchemaFactory.createForClass(Flight);
