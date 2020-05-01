import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamRepository } from './team.repository';
import { PlayerModule } from '@modules/player/player.module';

@Module({
  controllers: [TeamController],
  providers: [TeamService],
  imports: [TypeOrmModule.forFeature([TeamRepository]), PlayerModule],
})
export class TeamModule {}
