import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../users.entity';

export class LoggedInResDto {
  @ApiProperty()
  user: Users;

  @ApiProperty()
  token: string;
}
