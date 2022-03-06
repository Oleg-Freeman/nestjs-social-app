import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { modelOptions, passwordRegEx } from '../../../resources/base';

export class LogInUserDto {
  @IsEmail()
  @IsNotEmpty()
  @Length(modelOptions.minStringFieldLength, modelOptions.maxStringFieldLength)
  readonly email: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message:
      'Password must contain uppercase and lowercase characters, numbers and special characters',
  })
  @Length(modelOptions.minPasswordLength, modelOptions.maxStringFieldLength)
  readonly password: string;
}
