import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  id: string;
  @Prop({ required: true })
  username: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 'user' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
