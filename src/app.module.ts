import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection as MongoseConnection } from 'mongoose';

// Local
import { multerStorage } from './configs/multerConfigs';
import TypeOrmModuleConfig from './configs/TypeOrmModuleConfig';
import MongooseConfig from './configs/MongooseConfig';

// Modules
import { AdminModule } from '@modules/admin/admin/admin.module';
import { AuthModule } from '@modules/auth/auth.module';
import { GameModule } from './modules/admin/game/game.module';
import { RoleModule } from './modules/admin/role/role.module';
import { UserModule } from './modules/user/user.module';
import { AvatarModule } from './modules/avatar/avatar.module';
import { AddressModule } from './modules/address/address.module';
import { LeagueTypeModule } from './modules/admin/league-type/league-type.module';
import { LeagueModule } from './modules/league/league.module';
import { LeagueThumbModule } from './modules/league-thumb/league-thumb.module';
import { HomeModule } from './modules/admin/home/home.module';
import { TeamModule } from './modules/team/team.module';
import { TeamShieldModule } from './modules/team-shield/team-shield.module';
import { NotificationModule } from './modules/notification/notification.module';
import { InvitationModule } from './modules/invitation/invitation.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { ParticipantModule } from './modules/participant/participant.module';
import { PlayerHomeModule } from './modules/player-home/player-home.module';

@Module({
  imports: [
    TypeOrmModuleConfig,
    MongooseConfig,
    MulterModule.register({ storage: multerStorage }),
    AdminModule,
    AuthModule,
    GameModule,
    RoleModule,
    UserModule,
    AvatarModule,
    AddressModule,
    LeagueTypeModule,
    LeagueModule,
    LeagueThumbModule,
    HomeModule,
    TeamModule,
    TeamShieldModule,
    NotificationModule,
    InvitationModule,
    SubscriptionModule,
    ParticipantModule,
    PlayerHomeModule,
  ],
})
export class AppModule {
  constructor(
    private connection: Connection,
    @InjectConnection() private mongooseConnection: MongoseConnection,
  ) {}
}
