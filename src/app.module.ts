import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection as MongoseConnection } from 'mongoose';

// Local
import { multerStorage } from './configs/multerConfigs';
import { PlayerModule } from './modules/player/player.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { TeamModule } from './modules/team/team.module';
import { ImageModule } from './modules/image/image.module';
import { AuthModule } from './modules/auth/auth.module';
import { MemberModule } from './modules/member/member.module';
import { ChampionshipModule } from './modules/championship/championship.module';
import { RegisterTeamModule } from './modules/register-team/register-team.module';
import { RegisterPlayerModule } from './modules/register-player/register-player.module';
import TypeOrmModuleConfig from './configs/TypeOrmModuleConfig';
import MongooseConfig from './configs/MongooseConfig';

@Module({
  imports: [
    TypeOrmModuleConfig,
    MongooseConfig,
    MulterModule.register({ storage: multerStorage }),
    PlayerModule,
    OrganizationModule,
    TeamModule,
    ImageModule,
    AuthModule,
    MemberModule,
    ChampionshipModule,
    RegisterTeamModule,
    RegisterPlayerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    private connection: Connection,
    @InjectConnection() private mongooseConnection: MongoseConnection,
  ) {}
}
