import { Injectable } from '@nestjs/common';
import CreateUserUseCase from '@/users/Domain/users.useCase';
import UsersRepository from '@/users/users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  createNewUserUseCase() {
    return new CreateUserUseCase(this.userRepository);
  }
}
