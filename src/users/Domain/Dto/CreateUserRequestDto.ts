import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export default class CreateUserRequestDto {
  @MaxLength(30)
  @IsEmail()
  @ApiProperty({
    type: 'string',
    maxLength: 30,
    example: 'hellokitty@gmail.com',
  })
  email: string;

  @MinLength(6)
  @MaxLength(80)
  @IsString()
  @ApiProperty({
    type: 'string',
    maxLength: 80,
    example: 'Verystrongpassword1',
  })
  pass: string;

  @MinLength(6)
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
  @ApiProperty({
    type: 'string',
    maxLength: 20,
    example: 'Jerry',
  })
  name: string;
}
