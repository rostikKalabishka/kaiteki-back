import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { Role } from 'src/types';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Exclude()
  @Prop({ required: true })
  password: string;

  @Prop({ default: 0 })
  salaryPerOneKm: number;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Roles',
    default: '65dcbdb352b7e537befdca31',
  })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
