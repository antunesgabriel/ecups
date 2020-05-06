import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';

@Module({
  providers: [AdminService],
  controllers: [AdminController],
  imports: [TypeOrmModule.forFeature([AdminRepository])],
})
export class AdminModule {}
