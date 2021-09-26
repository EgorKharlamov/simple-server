import UsersRepository from '@/users/users.repository';
import UsersEntity from '@/users/Domain/users.entity';
import GetUserByIdRequest from '@/users/Domain/Requests/GetUserByIdRequest';
import {
  DomainValidationErrorCreator,
  DomainValidationErrorTypes,
} from '@/Errors/DomainValidationError';

export default class GetUserByIdUseCase {
  constructor(public userRepository: UsersRepository) {}

  async do(request: GetUserByIdRequest): Promise<UsersEntity> {
    const user = await this.userRepository.getUserById(request.id);
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
