import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './common/users/users.module';
import { PostsModule } from './common/posts/posts.module';
import { AuthModule } from './common/auth/auth.module';

const nodeEnv = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${nodeEnv}.env`,
    }),
    TypeOrmModule.forRoot(),
    UsersModule,
    PostsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [], // services
})
export class AppModule {}
