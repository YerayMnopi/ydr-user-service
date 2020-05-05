import { UsersService } from './user.service';
import { Controller, Get } from '@nestjs/common';


@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get('users')
  async findAll() {
    return this.usersService.findAll();
  }
}
