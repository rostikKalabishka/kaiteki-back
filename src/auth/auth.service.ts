import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { hash, genSalt, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schemas';
import { RegistrationUserDto } from './dtos/registration-user.dto';
import { UsersService } from 'src/users/users.service';
import { sanitize } from 'src/utils/sanitize';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
  async registration(dto: RegistrationUserDto) {
    const oldUser = await this.userService.find(dto.email);
    if (oldUser) {
      throw new BadRequestException(
        'User with this email is already in the system',
      );
    }
    const salt = await genSalt(10);
    const newUser = await this.userService.create({
      email: dto.email,
      fullName: dto.fullName,
      password: await hash(dto.password, salt),
    });

    const token = this.jwtService.sign(newUser.id);

    return {
      user: sanitize(newUser),

      token,
    };
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const token = await this.jwtService.signAsync(user.id);
    return {
      user: sanitize(user),
      token,
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.find(email);
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
