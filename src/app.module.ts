import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from '@/users/users.controller';
import { UsersService } from '@/users/users.service';
import UsersRepository from '@/users/users.repository';

@Module({
  imports: [TypeOrmModule.forRoot(), ConfigModule.forRoot({ isGlobal: true })],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class AppModule {}
