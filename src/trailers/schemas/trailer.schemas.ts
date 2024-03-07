import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TrailerDocument = Trailer & Document;
@Schema()
export class Trailer {
  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  trailerNumber: string;
}
export const TrailerSchema = SchemaFactory.createForClass(Trailer);
