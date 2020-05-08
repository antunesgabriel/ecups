import { Module } from '@nestjs/common';
import { LeagueController } from './league.controller';
import { LeagueService } from './league.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeagueRepository } from './league.repository';
import { UserModule } from '@modules/user/user.module';
import { LeagueTypeModule } from '@modules/admin/league-type/league-type.module';
import { GameModule } from '@modules/admin/game/game.module';

@Module({
  controllers: [LeagueController],
  providers: [LeagueService],
  imports: [
    TypeOrmModule.forFeature([LeagueRepository]),
    UserModule,
    LeagueTypeModule,
    GameModule,
  ],
  exports: [LeagueService],
})
export class LeagueModule {}
