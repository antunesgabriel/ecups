import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ParticipantSchema } from '@schemas/participant.schema';
import { LeagueModule } from '@modules/league/league.module';

@Module({
  providers: [ParticipantService],
  imports: [
    MongooseModule.forFeature([
      { name: 'Participant', schema: ParticipantSchema },
    ]),
    LeagueModule,
  ],
  exports: [ParticipantService],
})
export class ParticipantModule {}
