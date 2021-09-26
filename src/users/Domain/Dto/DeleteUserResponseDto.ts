import { ApiProperty } from '@nestjs/swagger';
import { Operation } from '@/types';

export default class DeleteUserResponseDto {
  @ApiProperty({ type: Operation })
  status: Operation;
}
