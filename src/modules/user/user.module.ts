import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { RoleModule } from '@modules/admin/role/role.module';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([UserRepository]), RoleModule, AuthModule],
  exports: [UserService],
})
export class UserModule {}
