import { Module } from '@nestjs/common';
import { LeagueController } from './league.controller';
import { LeagueService } from './league.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeagueRepository } from './league.repository';

@Module({
  controllers: [LeagueController],
  providers: [LeagueService],
  imports: [TypeOrmModule.forFeature([LeagueRepository])],
})
export class LeagueModule {}
