import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import { LogInUserDto } from './dto/log-in-user.dto';
import { IdParamDto } from '../../resources/base/id-param.dto';

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

  @Get('profile/:id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param() params: IdParamDto): Promise<Users> {
    return this.userService.getById(params.id);
  }
}
