import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';

import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { sanitize } from 'src/utils/sanitize';
@UseGuards(JwtAuthGuard)
@UseGuards(AdminGuard)
@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    return sanitize(user);
  }

  @Get('')
  findAllUsers(@Query() query: ExpressQuery) {
    return this.userService.findAll(query);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
