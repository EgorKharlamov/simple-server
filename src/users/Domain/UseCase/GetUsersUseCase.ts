import UsersRepository from '@/users/users.repository';
import UsersEntity from '@/users/Domain/users.entity';

export default class GetUsersUseCase {
  constructor(public userRepository: UsersRepository) {}

  async do(): Promise<UsersEntity[]> {
    return this.userRepository.getUsers();
  }
}
