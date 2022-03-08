import { IsNotEmpty, Length } from 'class-validator';
import { LogInUserDto } from './log-in-user.dto';
import { modelOptions } from '../../../resources/base';
import { IsPasswordMatch } from '../users.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends LogInUserDto {
  constructor() {
    super();
  }

  @ApiProperty()
  @IsNotEmpty()
  @Length(modelOptions.minStringFieldLength, modelOptions.maxStringFieldLength)
  readonly firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(modelOptions.minStringFieldLength, modelOptions.maxStringFieldLength)
  readonly lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPasswordMatch('password')
  readonly confirmPassword: string;
}
