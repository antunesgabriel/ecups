import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ParticipantSchema } from '@schemas/participant.schema';

@Module({
  providers: [ParticipantService],
  imports: [
    MongooseModule.forFeature([
      { name: 'Participant', schema: ParticipantSchema },
    ]),
  ],
  exports: [ParticipantService],
})
export class ParticipantModule {}
