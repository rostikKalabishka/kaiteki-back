import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Track extends Document {
  @Prop({ required: true })
  make: string;

  @Prop({ required: true })
  carModel: string;

  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  fuelCosts: number;

  @Prop({ required: true })
  gasolineTankCapacity: number;

  @Prop({ required: true })
  trackNumber: string;
}
export const TrackSchema = SchemaFactory.createForClass(Track);
