import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export default class CreateUserRequestDto {
  @MaxLength(30)
  @IsEmail()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    maxLength: 30,
    required: false,
    example: 'hellokitty@gmail.com',
  })
  email: string;

  @MaxLength(80)
  @IsString()
  @ApiProperty({
    type: 'string',
    maxLength: 80,
    example: 'Verystrongpassword1',
  })
  pass: string;

  @MaxLength(80)
  @IsString()
  @ApiProperty({
    type: 'string',
    maxLength: 80,
    example: 'Verystrongpassword1',
  })
  passRepeat: string;

  @MaxLength(20)
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    maxLength: 20,
    example: 'Jerry',
  })
  name: string;
}
