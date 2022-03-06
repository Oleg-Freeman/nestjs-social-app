import { IsNotEmpty, Length } from 'class-validator';
import { LogInUserDto } from './logInUser.dto';
import { modelOptions } from '../../../resources/base';

export class CreateUserDto extends LogInUserDto {
  constructor() {
    super();
  }

  @IsNotEmpty()
  @Length(modelOptions.minStringFieldLength, modelOptions.maxStringFieldLength)
  readonly firstName: string;

  @IsNotEmpty()
  @Length(modelOptions.minStringFieldLength, modelOptions.maxStringFieldLength)
  readonly lastName: string;

  @IsNotEmpty()
  readonly confirmPassword: string;
}
