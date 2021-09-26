import { ApiProperty } from '@nestjs/swagger';

export default class DeleteUserRequestDto {
  @ApiProperty({
    type: 'number',
    example: '1',
  })
  id: number;
}
