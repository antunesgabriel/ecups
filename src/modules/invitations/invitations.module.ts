import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Local
import { InvitationsService } from './invitations.service';
import { InvitationsController } from './invitations.controller';
import { TeamInvitationPlayerSchema } from '@schemas/team-invitation-player.schema';
import { NotificationPlayerSchema } from '@schemas/notification-player.schema';
import { PlayerModule } from '@modules/player/player.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamRepository } from '@modules/team/team.repository';

@Module({
  providers: [InvitationsService],
  controllers: [InvitationsController],
  imports: [
    TypeOrmModule.forFeature([TeamRepository]),
    MongooseModule.forFeature([
      { name: 'TeamInvitationPlayer', schema: TeamInvitationPlayerSchema },
      { name: 'NotificationPlayer', schema: NotificationPlayerSchema },
    ]),
    PlayerModule,
  ],
})
export class InvitationsModule {}
