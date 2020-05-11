import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import { UserModule } from '@modules/user/user.module';
import { LeagueModule } from '@modules/league/league.module';

@Module({
  controllers: [HomeController],
  providers: [HomeService],
  imports: [UserModule, LeagueModule],
})
export class HomeModule {}
