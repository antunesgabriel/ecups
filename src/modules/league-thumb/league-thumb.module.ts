import { Module } from '@nestjs/common';
import { LeagueThumbController } from './league-thumb.controller';

@Module({
  controllers: [LeagueThumbController]
})
export class LeagueThumbModule {}
