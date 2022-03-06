import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Users } from './users.entity';
import { Repository, FindOneOptions, EntityManager } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { saltRoundsNumber } from '../../resources/base';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async create(
    body: CreateUserDto,
    transactionManager: EntityManager,
  ): Promise<{ user: Users; token: string }> {
    const { password, lastName, firstName, email } = body;

    const salt = await genSalt(saltRoundsNumber);
    const passwordHash = await hash(password, salt);

    const userData = await transactionManager.create(Users, {
      email,
      password: passwordHash,
      firstName,
      lastName,
    });
    const user = await transactionManager.save(userData);

    const token = sign({ userId: user.id }, process.env.JWT_SECRET);

    return {
      user,
      token,
    };
  }

  async getOne(
    id: number | null = null,
    options: FindOneOptions | null = null,
    transactionManager: EntityManager,
  ) {
    return transactionManager.findOne(Users, id, options);
  }
}
