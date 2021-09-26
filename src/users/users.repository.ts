import { Connection } from 'typeorm';
import { Injectable } from '@nestjs/common';
import UsersEntity from '@/users/Domain/users.entity';
import UsersOrm from '@/users/users.orm';
import { IUserRepository } from '@/users/Domain/IUser.repository';
import UsersMapper from '@/users/Domain/users.mapper';
import { Operation, UniqueIdentifier } from '@/types';
import { nonNullable } from '@/utils/objects';
import DeleteUserResponseDto from '@/users/Domain/Dto/DeleteUserResponseDto';

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

  async getUsers(): Promise<UsersEntity[]> {
    const users = await this.connection.manager.find(UsersOrm);
    return UsersMapper.ormListToDomain(users);
  }

  async getUserById(id: UniqueIdentifier): Promise<UsersEntity> {
    const user = await this.connection.manager.findOne(UsersOrm, {
      where: {
        id,
      },
    });
    if (user) {
      return UsersMapper.ormToDomain(user);
    }
  }

  async getUserByName(name: string): Promise<UsersEntity> {
    const user = await this.connection.manager.findOne(UsersOrm, {
      where: {
        name,
      },
    });
    if (user) {
      return UsersMapper.ormToDomain(user);
    }
  }

  async editUser(
    id: UniqueIdentifier,
    email?: string,
    pass?: string,
    name?: string,
  ): Promise<UsersEntity> {
    const editable = nonNullable({
      name,
      email,
      password: pass,
    });
    const edit = await this.connection.manager.update(
      UsersOrm,
      {
        id,
      },
      editable,
    );

    if (edit.affected) {
      return this.getUserById(id);
    }
  }

  async deleteUser(id: UniqueIdentifier): Promise<DeleteUserResponseDto> {
    const deletedUser = await this.connection.manager.update(
      UsersOrm,
      { id },
      { deleted_at: new Date() },
    );
    if (deletedUser.affected) {
      return { status: Operation.ok };
    }
    return { status: Operation.fail };
  }
}
