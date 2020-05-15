import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamRepository } from './team.repository';
import { UserModule } from '@modules/user/user.module';

@Module({
  providers: [TeamService],
  controllers: [TeamController],
  imports: [TypeOrmModule.forFeature([TeamRepository]), UserModule],
  exports: [TeamService],
})
export class TeamModule {}
