import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Model } from 'mongoose';

import { hash, genSalt, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schemas';
import { RegistrationUserDto } from './dtos/registration-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async registration(dto: RegistrationUserDto) {
    const oldUser = await this.userModel.findOne({ email: dto.email });
    if (oldUser) {
      throw new BadRequestException(
        'User with this email is already in the system',
      );
    }
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      email: dto.email,
      fullName: dto.fullName,
      password: await hash(dto.password, salt),
    });

    const token = await this.jwtService.signAsync(newUser.id);

    return { user: newUser, token };
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const token = await this.jwtService.signAsync(user.id);
    return {
      user: user,
      token,
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isValidatePassword = await compare(password, user.password);

    if (!isValidatePassword) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }
}
