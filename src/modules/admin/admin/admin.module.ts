import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';
import { RoleEntity } from '@models/role.entity';

@Module({
  providers: [AdminService],
  controllers: [AdminController],
  imports: [TypeOrmModule.forFeature([AdminRepository, RoleEntity])],
})
export class AdminModule {}
