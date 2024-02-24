import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  findAllUser() {}

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return id;
  }
}
