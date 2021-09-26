import { ApiProperty } from '@nestjs/swagger';

export class ValidatorError {
  @ApiProperty({ type: 'string', example: 'IsString' })
  type: string;

  @ApiProperty({ type: 'string', example: 'id' })
  param: string;

  @ApiProperty({ type: 'string', example: 'id is not string' })
  message: string;
}

export default class ErrorBadRequestResponseDto {
  @ApiProperty({ type: 'number', example: 400 })
  statusCode: number;

  @ApiProperty({ type: 'string', example: 'Validation error' })
  message: string;

  @ApiProperty({ type: 'string', example: 'Bad request' })
  error: string;

  @ApiProperty({ type: ValidatorError })
  validator: ValidatorError | ValidatorError[];
}
