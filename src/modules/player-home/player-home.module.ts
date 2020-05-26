import { Module } from '@nestjs/common';
import { PlayerHomeController } from './player-home.controller';
import { PlayerHomeService } from './player-home.service';
import { LeagueRepository } from '@modules/league/league.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipantModule } from '@modules/participant/participant.module';
import { UserModule } from '@modules/user/user.module';

@Module({
  controllers: [PlayerHomeController],
  providers: [PlayerHomeService],
  imports: [
    TypeOrmModule.forFeature([LeagueRepository]),
    ParticipantModule,
    UserModule,
  ],
})
export class PlayerHomeModule {}
