import UsersRepository from '@/users/users.repository';
import {
  DomainValidationErrorCreator,
  DomainValidationErrorTypes,
} from '@/Errors/DomainValidationError';
import DeleteUserRequest from '@/users/Domain/Requests/DeleteUserRequest';
import DeleteUserResponseDto from '@/users/Domain/Dto/DeleteUserResponseDto';

export default class DeleteUserUseCase {
  constructor(public userRepository: UsersRepository) {}

  async do(request: DeleteUserRequest): Promise<DeleteUserResponseDto> {
    await this.validate(request);
    return this.userRepository.deleteUser(request.id);
  }

  async validate(request: DeleteUserRequest) {
    const user = await this.userRepository.getUserById(request.id);
    if (!user || user.deletedAt) {
      throw new DomainValidationErrorCreator(
        DomainValidationErrorTypes.notExists,
        'user',
        'No such user!',
      ).do();
    }
  }
}
