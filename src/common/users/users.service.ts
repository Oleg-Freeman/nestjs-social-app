import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Users } from './users.entity';
import { Repository, FindOneOptions, EntityManager, getManager } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { saltRoundsNumber } from '../../resources/base';
import { LogInUserDto } from './dto/log-in-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private userRepository: Repository<Users>) {}

  async create(body: CreateUserDto): Promise<{ user: Users; token: string }> {
    const { password, lastName, firstName, email } = body;

    const salt = await genSalt(saltRoundsNumber);
    const passwordHash = await hash(password, salt);

    return await getManager().transaction(async (transactionManager) => {
      const user = await this.getOne(
        null,
        {
          where: { email: body.email },
        },
        transactionManager,
      );

      if (user) {
        throw new HttpException({ error: 'Email is already exist' }, HttpStatus.BAD_REQUEST);
      }

      const userData = await transactionManager.create(Users, {
        email,
        password: passwordHash,
        firstName,
        lastName,
      });
      const newUser = await transactionManager.save(userData);

      const token = sign({ userId: newUser.id }, process.env.JWT_SECRET);

      return {
        user: newUser,
        token,
      };
    });
  }

  async logIn(body: LogInUserDto): Promise<{ user: Users; token: string }> {
    return await getManager().transaction(async (transactionManager) => {
      const user = await this.getOne(
        null,
        {
          where: { email: body.email },
        },
        transactionManager,
      );

      if (!user) {
        throw new HttpException({ error: 'Wrong credentials, try again' }, HttpStatus.BAD_REQUEST);
      }

      const isPasswordMatch = await compare(body.password, user.password);

      if (!isPasswordMatch) {
        throw new HttpException({ error: 'Wrong credentials, try again' }, HttpStatus.BAD_REQUEST);
      }

      const token = sign({ userId: user.id }, process.env.JWT_SECRET);

      return {
        user,
        token,
      };
    });
  }

  async getOne(
    id: number | null = null,
    options: FindOneOptions | null = null,
    transactionManager?: EntityManager,
  ): Promise<Users> {
    return transactionManager.findOne(Users, id, options);
  }

  async getById(id: number): Promise<Users> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new HttpException({ error: 'User not found' }, HttpStatus.BAD_REQUEST);
    }

    return user;
  }
}
