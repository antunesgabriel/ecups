import { Module } from '@nestjs/common';
import { InvitationController } from './invitation.controller';
import { InvitationService } from './invitation.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InvitationSchema } from '@schemas/invitation.schema';
import { NotificationModule } from '@modules/notification/notification.module';
import { TeamModule } from '@modules/team/team.module';
import { UserModule } from '@modules/user/user.module';

@Module({
  controllers: [InvitationController],
  providers: [InvitationService],
  imports: [
    MongooseModule.forFeature([
      { name: 'Invitation', schema: InvitationSchema },
    ]),
    NotificationModule,
    UserModule,
    TeamModule,
  ],
})
export class InvitationModule {}
