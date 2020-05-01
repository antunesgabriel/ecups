import { Module } from '@nestjs/common';
import { RegisterPlayerService } from './register-player.service';
import { RegisterPlayerController } from './register-player.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterPlayerRepository } from './register-player.repository';
import { ChampionshipModule } from '@modules/championship/championship.module';
import { OrganizationRepository } from '@modules/organization/organization.repository';
import { PlayerRepository } from '@modules/player/player.repository';

@Module({
  providers: [RegisterPlayerService],
  controllers: [RegisterPlayerController],
  imports: [
    TypeOrmModule.forFeature([
      RegisterPlayerRepository,
      OrganizationRepository,
      PlayerRepository,
    ]),
    ChampionshipModule,
  ],
})
export class RegisterPlayerModule {}
