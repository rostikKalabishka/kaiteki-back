import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Trailer extends Document {
  @Prop({ required: true })
  weight: number;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  trailerNumber: string;
}
export const TrailerSchema = SchemaFactory.createForClass(Trailer);
