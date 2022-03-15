import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { modelOptions, passwordRegEx } from '../../../resources';
import { ApiProperty } from '@nestjs/swagger';

export class LogInUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Length(modelOptions.minStringFieldLength, modelOptions.maxStringFieldLength)
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: 'Password must contain uppercase and lowercase characters, numbers and special characters',
  })
  @Length(modelOptions.minPasswordLength, modelOptions.maxStringFieldLength)
  readonly password: string;
}
