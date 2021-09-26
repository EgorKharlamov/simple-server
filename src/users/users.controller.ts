import { Controller, Post, Body, UseFilters, Get } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import CreateUserRequest from '@/users/Domain/Requests/CreateUserRequest';
import CreateUserRequestDto from '@/users/Domain/Dto/CreateUserRequestDto';
import UserDto from '@/users/Domain/Dto/UserDto';
import UsersMapper from '@/users/Domain/users.mapper';
import { DomainValidationErrorExceptionFilter } from '@/Errors/domain-validation-error-exception.filter';

@Controller('users')
@ApiTags('Users')
@UseFilters(new DomainValidationErrorExceptionFilter())
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('user')
  @ApiBody({ type: CreateUserRequestDto })
  @ApiResponse({ type: UserDto })
  async createUser(@Body() body: CreateUserRequestDto) {
    const request = new CreateUserRequest(
      body.email,
      body.pass,
      body.passRepeat,
      body.name,
    );
    const useCase = this.usersService.createNewUserUseCase();
    const user = await useCase.do(request);
    return UsersMapper.domainToDto(user);
  }

  @Get('users')
  @ApiResponse({ type: [UserDto] })
  async getUsers() {
    const useCase = this.usersService.getUsers();
    const users = await useCase.do();
    return UsersMapper.domainListToDto(users);
  }
}
