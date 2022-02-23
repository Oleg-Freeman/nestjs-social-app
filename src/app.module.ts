import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

const nodeEnv = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${nodeEnv}.env`,
    }),
    TypeOrmModule.forRoot(),
  ],
  controllers: [],
  providers: [], // services
})
export class AppModule {}
