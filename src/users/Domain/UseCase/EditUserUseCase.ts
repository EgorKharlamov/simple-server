import UsersRepository from '@/users/users.repository';
import EditUserRequest from '@/users/Domain/Requests/EditUserRequest';
import UsersEntity from '@/users/Domain/users.entity';
import {
  DomainValidationErrorCreator,
  DomainValidationErrorTypes,
} from '@/Errors/DomainValidationError';

export default class EditUserUseCase {
  constructor(public userRepository: UsersRepository) {}

  async do(request: EditUserRequest): Promise<UsersEntity> {
    await this.validate(request);
    return this.userRepository.editUser(
      request.id,
      request.email,
      request.pass,
      request.name,
    );
  }

  async validate(request: EditUserRequest) {
    const user = await this.userRepository.getUserById(request.id);
    if (!user) {
      throw new DomainValidationErrorCreator(
        DomainValidationErrorTypes.notExists,
        'id',
        'No such user!',
      ).do();
    }
    if (user.deletedAt) {
      throw new DomainValidationErrorCreator(
        DomainValidationErrorTypes.notExists,
        'deleted',
        'User deleted!',
      ).do();
    }
  }
}
