import { Module } from '@nestjs/common';
import { RegisterPlayerService } from './register-player.service';
import { RegisterPlayerController } from './register-player.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterPlayerRepository } from './register-player.repository';
import { ChampionshipModule } from '@modules/championship/championship.module';
import { OrganizationRepository } from '@modules/organization/organization.repository';
import { PlayerRepository } from '@modules/player/player.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationPlayerSchema } from 'src/schemas/notification-player.schema';

@Module({
  providers: [RegisterPlayerService],
  controllers: [RegisterPlayerController],
  imports: [
    TypeOrmModule.forFeature([
      RegisterPlayerRepository,
      OrganizationRepository,
      PlayerRepository,
    ]),
    MongooseModule.forFeature([
      { name: 'NotificationPlayer', schema: NotificationPlayerSchema },
    ]),
    ChampionshipModule,
  ],
})
export class RegisterPlayerModule {}
