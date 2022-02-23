import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {
  requiredStringFieldOptions,
  optionalStringFieldOptions,
} from '../../resources/base';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column(requiredStringFieldOptions)
  firstName: string;

  @Column(requiredStringFieldOptions)
  lastName: string;

  @Column(requiredStringFieldOptions)
  email: string;

  @Column(requiredStringFieldOptions)
  password: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  isDeleted: boolean;

  @Column({ type: 'date', nullable: true })
  birthDay: string;

  @Column(optionalStringFieldOptions)
  bio: string;

  @Column(optionalStringFieldOptions)
  website: string;

  @Column(optionalStringFieldOptions)
  location: string;

  @Column(optionalStringFieldOptions)
  phone: string;
}
