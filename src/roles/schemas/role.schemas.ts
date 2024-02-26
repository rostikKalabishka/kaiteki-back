import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Roles extends Document {
  @Prop()
  role_id: string;
  @Prop()
  title: string;
}

export const RolesSchema = SchemaFactory.createForClass(Roles);
