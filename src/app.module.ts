import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './common/users/users.module';

const nodeEnv = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${nodeEnv}.env`,
    }),
    TypeOrmModule.forRoot(),
    UsersModule,
  ],
  controllers: [],
  providers: [], // services
})
export class AppModule {}
