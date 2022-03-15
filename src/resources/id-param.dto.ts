import { IsInt, IsPositive, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { modelOptions } from './validationRules';

export class IdParamDto {
  @IsInt()
  @IsPositive()
  @Max(modelOptions.maxIntegerValue)
  @Type(() => Number)
  readonly id: number;
}
