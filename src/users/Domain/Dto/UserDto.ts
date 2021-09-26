import { ApiProperty } from '@nestjs/swagger';
import { UniqueIdentifier } from '@/types';

export default class UserDto {
  @ApiProperty({ type: 'number', example: 1 })
  id: UniqueIdentifier;

  @ApiProperty({ type: 'string', example: 'Jerry' })
  name: string;

  @ApiProperty({
    type: 'string',
    example: 'hellokitty@gmail.com',
  })
  email: string;

  @ApiProperty({ type: 'DateTime', example: '2021-07-31T11:48:56.871Z' })
  createdAt: Date;

  @ApiProperty({
    type: 'DateTime',
    required: false,
    example: '2021-07-31T11:48:56.871Z',
  })
  deletedAt?: Date;
}
