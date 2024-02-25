import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LoginUserDto } from './dtos/login-user.dto';
import { RegistrationUserDto } from './dtos/registration-user.dto';

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
}
