import UsersEntity from '@/users/Domain/users.entity';

export interface IUserRepository {
  createUser(
    email: string,
    password: string,
    name: string,
  ): Promise<UsersEntity>;

  findByEmail(email: string): Promise<UsersEntity>;
}
