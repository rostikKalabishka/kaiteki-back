import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginUserDto } from './dtos/login-user.dto';
import { RegistrationUserDto } from './dtos/registration-user.dto';

import { User } from 'src/users/schemas/user.schemas';
import { JwtAuthGuard } from './guards/jwt.guard';
import { CurrentUser } from './decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('registration')
  async registration(@Body() dto: RegistrationUserDto) {
    return this.authService.registration(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getMe(@CurrentUser() user: User) {
    return this.authService.getMe(user);
  }
}
