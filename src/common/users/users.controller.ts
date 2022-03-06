import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  HttpException,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import { getConnection } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @HttpCode(201)
  async register(
    @Body() body: CreateUserDto,
  ): Promise<{ user: Users; token: string }> {
    if (body.password !== body.confirmPassword) {
      throw new HttpException(
        { error: 'Password don`t match' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const queryRunner = getConnection().createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const { manager } = queryRunner;

    try {
      const user = await this.userService.getOne(
        null,
        {
          where: { email: body.email },
        },
        manager,
      );

      if (user) {
        throw new Error('Email is already exist');
      }

      const newUser = await this.userService.create(body, manager);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return newUser;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new HttpException({ error: error.message }, HttpStatus.BAD_REQUEST);
    }
  }
}
