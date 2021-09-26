import { Injectable } from '@nestjs/common';
import CreateUserUseCase from '@/users/Domain/UseCase/CreateUserUseCase';
import UsersRepository from '@/users/users.repository';
import GetUsersUseCase from '@/users/Domain/UseCase/GetUsersUseCase';
import GetUserByIdUseCase from '@/users/Domain/UseCase/GetUserByIdUseCase';
import GetUserByNameUseCase from '@/users/Domain/UseCase/GetUserByNameUseCase';
import EditUserUseCase from '@/users/Domain/UseCase/EditUserUseCase';
import DeleteUserUseCase from '@/users/Domain/UseCase/DeleteUserUseCase';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  createNewUserUseCase() {
    return new CreateUserUseCase(this.userRepository);
  }

  getUsers() {
    return new GetUsersUseCase(this.userRepository);
  }

  getUserById() {
    return new GetUserByIdUseCase(this.userRepository);
  }

  getUserByName() {
    return new GetUserByNameUseCase(this.userRepository);
  }

  editUser() {
    return new EditUserUseCase(this.userRepository);
  }

  deleteUser() {
    return new DeleteUserUseCase(this.userRepository);
  }
}
