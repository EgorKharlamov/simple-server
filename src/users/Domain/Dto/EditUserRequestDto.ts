import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

export default class EditUserRequestDto {
  @IsOptional()
  @MaxLength(30)
  @IsEmail()
  @ApiProperty({
    type: 'string',
    maxLength: 30,
    example: 'hellokitty@gmail.com',
  })
  email?: string;

  @IsOptional()
  @MinLength(6)
  @MaxLength(80)
  @IsString()
  @ApiProperty({
    type: 'string',
    maxLength: 80,
    example: 'Verystrongpassword1',
  })
  @ApiProperty({ type: 'string', required: false })
  pass?: string;

  @IsOptional()
  @MaxLength(20)
  @IsString()
  @ApiProperty({
    type: 'string',
    maxLength: 20,
    example: 'Jerry',
  })
  @ApiProperty({ type: 'string', required: false })
  name?: string;
}
