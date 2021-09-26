import UsersRepository from '@/users/users.repository';
import CreateUserRequest from '@/users/Domain/Requests/CreateUserRequest';
import UsersEntity from '@/users/Domain/users.entity';
import {
  DomainValidationErrorCreator,
  DomainValidationErrorTypes,
} from '@/Errors/DomainValidationError';

export default class CreateUserUseCase {
  constructor(public userRepository: UsersRepository) {}

  async do(request: CreateUserRequest): Promise<UsersEntity> {
    try {
      await this.validate(request);
      const passHash = UsersEntity.hashPassword(request.pass);
      return this.userRepository.createUser(
        request.email,
        passHash,
        request.name,
      );
    } catch (e) {
      throw e;
    }
  }

  async validate(request: CreateUserRequest) {
    const user = await this.userRepository.findByEmail(request.email, true);
    if (user) {
      throw new DomainValidationErrorCreator(
        DomainValidationErrorTypes.exists,
        'email',
        'User with such email exists!',
      ).do();
    }

    if (request.pass !== request.passRepeat) {
      throw new DomainValidationErrorCreator(
        DomainValidationErrorTypes.notEqual,
        'pass',
        'Not equal passwords!',
      ).do();
    }
  }
}
