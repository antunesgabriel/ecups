import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionSchema } from '@schemas/subscription.schema';
import { UserModule } from '@modules/user/user.module';
import { TeamModule } from '@modules/team/team.module';
import { LeagueModule } from '@modules/league/league.module';

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  imports: [
    MongooseModule.forFeature([
      { name: 'Subscription', schema: SubscriptionSchema },
    ]),
    UserModule,
    TeamModule,
    LeagueModule,
  ],
})
export class SubscriptionModule {}
