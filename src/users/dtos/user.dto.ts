import { Exclude } from 'class-transformer';

export class UserDto extends Document {
  @Exclude()
  email: string;
  @Exclude()
  fullName: string;
}
