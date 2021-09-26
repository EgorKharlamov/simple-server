import UsersEntity from '@/users/Domain/users.entity';
import { UniqueIdentifier } from '@/types';
import DeleteUserResponseDto from '@/users/Domain/Dto/DeleteUserResponseDto';

export interface IUserRepository {
  createUser(
    email: string,
    password: string,
    name: string,
  ): Promise<UsersEntity>;

  findByEmail(email: string): Promise<UsersEntity>;

  getUsers(): Promise<UsersEntity[]>;

  getUserById(id: UniqueIdentifier): Promise<UsersEntity>;

  getUserByName(name: string): Promise<UsersEntity>;

  editUser(
    id: UniqueIdentifier,
    email?: string,
    pass?: string,
    name?: string,
  ): Promise<UsersEntity>;

  deleteUser(id: UniqueIdentifier): Promise<DeleteUserResponseDto>;
}
