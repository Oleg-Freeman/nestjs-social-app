import { Entity, Column, OneToMany } from 'typeorm';
import { requiredStringFieldOptions, optionalStringFieldOptions, Base } from '../../resources';
import { ApiProperty } from '@nestjs/swagger';
import { Posts } from '../posts/posts.entity';

@Entity()
export class Users extends Base {
  @ApiProperty({ example: 'string' })
  @Column(requiredStringFieldOptions)
  firstName: string;

  @ApiProperty({ example: 'string' })
  @Column(requiredStringFieldOptions)
  lastName: string;

  @ApiProperty({ example: 'string' })
  @Column({ ...requiredStringFieldOptions, unique: true })
  email: string;

  @ApiProperty({ example: 'string' })
  @Column(requiredStringFieldOptions)
  password: string;

  @ApiProperty({ example: false })
  @Column({ type: 'boolean', nullable: false, default: false })
  isDeleted: boolean;

  @ApiProperty({ example: 'string' })
  @Column({ type: 'date', nullable: true })
  birthDay: string;

  @ApiProperty({ example: 'string' })
  @Column(optionalStringFieldOptions)
  bio: string;

  @ApiProperty({ example: 'string' })
  @Column(optionalStringFieldOptions)
  website: string;

  @ApiProperty({ example: 'string' })
  @Column(optionalStringFieldOptions)
  location: string;

  @ApiProperty({ example: 'string' })
  @Column(optionalStringFieldOptions)
  phone: string;

  @OneToMany(() => Posts, (post) => post.user)
  posts: Posts[];
}
