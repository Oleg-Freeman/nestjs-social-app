import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({ secret: process.env.JWT_SECRET || 'JWT_SUPER_SECRET' }),
  ],
})
export class UsersModule {}
