import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import { LogInUserDto } from './dto/logInUser.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: CreateUserDto): Promise<{ user: Users; token: string }> {
    return this.userService.create(body);
  }

  @Post('log-in')
  @HttpCode(HttpStatus.OK)
  async logIn(@Body() body: LogInUserDto): Promise<{ user: Users; token: string }> {
    return this.userService.logIn(body);
  }
}
