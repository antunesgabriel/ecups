import { Module } from '@nestjs/common';
import { LeagueThumbController } from './league-thumb.controller';
import { LeagueModule } from '@modules/league/league.module';

@Module({
  controllers: [LeagueThumbController],
  imports: [LeagueModule],
})
export class LeagueThumbModule {}
