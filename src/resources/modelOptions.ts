import { ColumnOptions } from 'typeorm';
import { modelOptions } from './validationRules';

export const requiredStringFieldOptions: ColumnOptions = {
  type: 'varchar',
  length: modelOptions.maxStringFieldLength,
  nullable: false,
};

export const optionalStringFieldOptions: ColumnOptions = {
  type: 'varchar',
  length: modelOptions.maxStringFieldLength,
  nullable: true,
};
