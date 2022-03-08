import { Base, requiredStringFieldOptions } from '../../resources/base';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../users/users.entity';

@Entity()
export class Posts extends Base {
  userId: number;

  @ApiProperty({ example: 'string' })
  @Column(requiredStringFieldOptions)
  text: string;

  @ApiProperty({ example: false })
  @Column({ type: 'boolean', nullable: false, default: false })
  isDeleted: boolean;

  @ManyToOne(() => Users, (user) => user.posts)
  user: Users;
}
