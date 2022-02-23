import { ColumnOptions } from 'typeorm';

interface ModelOptions {
  maxStringFieldLength: number;
}

export const modelOptions: ModelOptions = {
  maxStringFieldLength: 255,
};

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
