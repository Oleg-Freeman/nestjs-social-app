import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { modelOptions } from '../../../resources';

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(modelOptions.minStringFieldLength, modelOptions.maxStringFieldLength)
  text: string;
}
