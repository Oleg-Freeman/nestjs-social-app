import { Body, Controller, HttpCode, HttpStatus, HttpException, Post } from '@nestjs/common';
import { getManager } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @HttpCode(201)
  async register(@Body() body: CreateUserDto): Promise<{ user: Users; token: string }> {
    return await getManager().transaction(async (transactionManager) => {
      const user = await this.userService.getOne(
        null,
        {
          where: { email: body.email },
        },
        transactionManager,
      );

      if (user) {
        throw new HttpException({ error: 'Email is already exist' }, HttpStatus.BAD_REQUEST);
      }

      return this.userService.create(body, transactionManager);
    });
  }
}
