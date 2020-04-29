import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { Connection } from 'typeorm';

// Local
import { multerStorage } from './configs/multerConfigs';
import { PlayerModule } from './modules/player/player.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { TeamModule } from './modules/team/team.module';
import { ImageModule } from './modules/image/image.module';
import { AuthModule } from './modules/auth/auth.module';
import { MemberModule } from './modules/member/member.module';
import { ChampionshipModule } from './modules/championship/championship.module';
import { RegisterModule } from './modules/register/register.module';
import TypeOrmModuleConfig from './configs/TypeOrmModuleConfig';

@Module({
  imports: [
    TypeOrmModuleConfig,
    MulterModule.register({ storage: multerStorage }),
    PlayerModule,
    OrganizationModule,
    TeamModule,
    ImageModule,
    AuthModule,
    MemberModule,
    ChampionshipModule,
    RegisterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
