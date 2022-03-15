import { Base, requiredStringFieldOptions } from '../../resources';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../users/users.entity';

@Entity()
export class Posts extends Base {
  @ApiProperty({ example: 1 })
  @Column({ type: 'int', nullable: false })
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
