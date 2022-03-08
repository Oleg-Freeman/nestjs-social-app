import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import { LogInUserDto } from './dto/log-in-user.dto';
import { IdParamDto } from '../../resources/base/id-param.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { LoggedInResDto } from './dto/logged-in.res.dto';
import { AuthGuard } from '../../resources/base/auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Register new user' })
  @ApiBody({
    required: true,
    type: CreateUserDto,
    examples: {
      a: {
        summary: 'User Log In Body',
        value: {
          firstName: 'string',
          lastName: 'string',
          email: 'email',
          password: 'string',
          confirmPassword: 'string',
        } as CreateUserDto,
      },
    },
  })
  @ApiCreatedResponse({ type: LoggedInResDto })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: CreateUserDto): Promise<{ user: Users; token: string }> {
    return this.userService.create(body);
  }

  @ApiOperation({ summary: 'log In' })
  @ApiBody({
    required: true,
    type: LogInUserDto,
    examples: {
      a: {
        summary: 'User Log In Body',
        value: {
          password: 'string',
          email: 'email',
        } as LogInUserDto,
      },
    },
  })
  @ApiOkResponse({ type: LoggedInResDto })
  @Post('log-in')
  @HttpCode(HttpStatus.OK)
  async logIn(@Body() body: LogInUserDto): Promise<{ user: Users; token: string }> {
    return this.userService.logIn(body);
  }

  @ApiOperation({ summary: 'Get user profile' })
  @ApiParam({
    name: 'id',
    description: 'user id',
    allowEmptyValue: false,
    example: 1,
  })
  @ApiOkResponse({ type: Users })
  @Get('profile/:id')
  @HttpCode(HttpStatus.OK)
  async getById(@Param() params: IdParamDto): Promise<Users> {
    return this.userService.getById(params.id);
  }

  @ApiOperation({ summary: 'Delete user profile' })
  @ApiParam({
    name: 'id',
    description: 'user id',
    allowEmptyValue: false,
    example: 1,
  })
  @ApiNoContentResponse()
  @UseGuards(AuthGuard)
  @Delete('profile/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() params: IdParamDto): Promise<void> {
    await this.userService.delete(params.id);
  }
}
