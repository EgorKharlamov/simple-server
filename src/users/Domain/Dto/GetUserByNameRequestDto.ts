import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class GetUserByNameRequestDto {
  @MaxLength(20)
  @IsString()
  @ApiProperty({
    type: 'string',
    maxLength: 20,
    example: 'Jerry',
  })
  @ApiProperty({ type: 'string', required: false })
  name: string;
}
