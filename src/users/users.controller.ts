import {
  Controller,
  Post,
  Body,
  UseFilters,
  Get,
  Param,
  Query,
  Patch,
  UsePipes,
  ValidationPipe,
  Delete,
} from '@nestjs/common';
import {
  ApiBody,
  ApiParam,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import CreateUserRequest from '@/users/Domain/Requests/CreateUserRequest';
import CreateUserRequestDto from '@/users/Domain/Dto/CreateUserRequestDto';
import UserDto from '@/users/Domain/Dto/UserDto';
import UsersMapper from '@/users/Domain/users.mapper';
import { DomainValidationErrorExceptionFilter } from '@/Errors/domain-validation-error-exception.filter';
import GetUserByIdRequest from '@/users/Domain/Requests/GetUserByIdRequest';
import GetUserByIdRequestDto from '@/users/Domain/Dto/GetUserByIdRequestDto';
import { ApiImplicitParam } from '@nestjs/swagger/dist/decorators/api-implicit-param.decorator';
import GetUserByNameRequest from '@/users/Domain/Requests/GetUserByNameRequest';
import GetUserByNameRequestDto from '@/users/Domain/Dto/GetUserByNameRequestDto';
import EditUserRequestDto from '@/users/Domain/Dto/EditUserRequestDto';
import EditUserRequest from '@/users/Domain/Requests/EditUserRequest';
import DeleteUserRequest from '@/users/Domain/Requests/DeleteUserRequest';

@Controller('users')
@ApiTags('Users')
@UseFilters(new DomainValidationErrorExceptionFilter())
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('createUser')
  @UsePipes(new ValidationPipe({ transform: true }))
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

  @Get()
  @ApiResponse({ type: [UserDto] })
  async getUsers() {
    const useCase = this.usersService.getUsers();
    const users = await useCase.do();
    return UsersMapper.domainListToDto(users);
  }

  @Get('find')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ type: UserDto })
  async getUserByName(@Query() query: GetUserByNameRequestDto) {
    const request = new GetUserByNameRequest(query.name);
    const useCase = this.usersService.getUserByName();
    const user = await useCase.do(request);
    return UsersMapper.domainToDto(user);
  }

  @Get('/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ type: UserDto })
  async getUserById(@Param() path: GetUserByIdRequestDto) {
    const request = new GetUserByIdRequest(path.id);
    const useCase = this.usersService.getUserById();
    const user = await useCase.do(request);
    return UsersMapper.domainToDto(user);
  }

  @Patch('/:id/edit')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiBody({ type: EditUserRequestDto })
  @ApiResponse({ type: UserDto })
  async editUser(@Param('id') id: number, @Body() body: EditUserRequestDto) {
    const request = new EditUserRequest(id, body.email, body.pass, body.name);
    const useCase = this.usersService.editUser();
    const user = await useCase.do(request);
    return UsersMapper.domainToDto(user);
  }

  @Delete('/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ type: String })
  async deleteUser(@Param('id') id: number) {
    const request = new DeleteUserRequest(id);
    const useCase = this.usersService.deleteUser();
    return await useCase.do(request);
  }
}
