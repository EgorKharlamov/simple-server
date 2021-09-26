import { Connection } from 'typeorm';
import { Injectable } from '@nestjs/common';
import UsersEntity from '@/users/Domain/users.entity';
import UsersOrm from '@/users/users.orm';
import { IUserRepository } from '@/users/Domain/IUser.repository';
import UsersMapper from '@/users/Domain/users.mapper';

@Injectable()
export default class UsersRepository implements IUserRepository {
  constructor(private readonly connection: Connection) {}

  async createUser(
    email: string,
    pass: string,
    name: string,
  ): Promise<UsersEntity> {
    const user = this.connection.manager.create(UsersOrm, {
      email,
      password: pass,
      name,
      created_at: new Date(),
    });
    await user.save();
    return UsersMapper.ormToDomain(user);
  }

  async findByEmail(email: string): Promise<UsersEntity> {
    const user = await this.connection.manager.findOne(UsersOrm, {
      where: {
        email,
      },
    });
    if (user) {
      return UsersMapper.ormToDomain(user);
    }
  }

  async getUsers(): Promise<any> {
    const users = await this.connection.manager.find(UsersOrm);
    return UsersMapper.ormListToDomain(users);
  }
}
