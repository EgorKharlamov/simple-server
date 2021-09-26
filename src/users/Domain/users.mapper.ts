import UsersOrm from '@/users/users.orm';
import UsersEntity from '@/users/Domain/users.entity';
import UserDto from '@/users/Domain/Dto/UserDto';

export default class UsersMapper {
  static ormToDomain(orm: UsersOrm): UsersEntity {
    return UsersEntity.new({
      id: orm.id,
      email: orm.email,
      name: orm.name,
      password: orm.password,
      createdAt: orm.created_at,
      deletedAt: orm.deleted_at,
    });
  }

  static domainToDto(user: UsersEntity): UserDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      deletedAt: user.deletedAt,
    };
  }
}
