import { Injectable } from '@nestjs/common';
import CreateUserUseCase from '@/users/Domain/UseCase/CreateUserUseCase';
import UsersRepository from '@/users/users.repository';
import GetUsersUseCase from '@/users/Domain/UseCase/GetUsersUseCase';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  createNewUserUseCase() {
    return new CreateUserUseCase(this.userRepository);
  }

  getUsers() {
    return new GetUsersUseCase(this.userRepository);
  }
}
