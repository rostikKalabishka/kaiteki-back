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
        'Користувач з такою поштою вже є в системі',
      );
    }
    const salt = await genSalt(10);
    const newUser = await this.userService.create({
      email: dto.email,
      role: dto.role,
      fullName: dto.fullName,
      password: await hash(dto.password, salt),
    });

    const token = await this.jwtService.signAsync(
      { id: newUser.id, role: newUser.role },
      {
        expiresIn: '15d',
      },
    );

    return {
      user: sanitize(newUser),
      token,
    };
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const token = await this.jwtService.signAsync(
      { id: user.id, role: user.role },
      {
        expiresIn: '15d',
      },
    );
    const fullUser = await user.populate('role');
    return {
      user: sanitize(fullUser),
      token,
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.find(email);
    if (!user) {
      throw new UnauthorizedException('Користувача не знайдено');
    }

    const isValidatePassword = await compare(password, user.password);

    if (!isValidatePassword) {
      throw new UnauthorizedException('Невірно введений пароль');
    }
    return user;
  }

  async getMe(user: User): Promise<User> {
    const currentUser = await this.userService.findById(user.id);

    return sanitize(await currentUser.populate('role'));
  }
}
