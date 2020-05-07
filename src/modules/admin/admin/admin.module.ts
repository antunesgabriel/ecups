import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';
import { RoleModule } from '../role/role.module';

@Module({
  providers: [AdminService],
  controllers: [AdminController],
  imports: [TypeOrmModule.forFeature([AdminRepository]), RoleModule],
})
export class AdminModule {}
