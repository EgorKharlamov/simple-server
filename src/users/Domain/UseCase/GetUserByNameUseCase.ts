import UsersRepository from '@/users/users.repository';
import UsersEntity from '@/users/Domain/users.entity';
import {
  DomainValidationErrorCreator,
  DomainValidationErrorTypes,
} from '@/Errors/DomainValidationError';
import GetUserByNameRequest from '@/users/Domain/Requests/GetUserByNameRequest';

export default class GetUserByNameUseCase {
  constructor(public userRepository: UsersRepository) {}

  async do(request: GetUserByNameRequest): Promise<UsersEntity> {
    const user = await this.userRepository.getUserByName(request.name);
    if (user) {
      return user;
    } else {
      throw new DomainValidationErrorCreator(
        DomainValidationErrorTypes.notExists,
        'user',
        'No such user!',
      ).do();
    }
  }
}
