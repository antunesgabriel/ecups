import { Module } from '@nestjs/common';
import { RegisterTeamService } from './register-team.service';
import { RegisterTeamController } from './register-team.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationPlayerSchema } from '@schemas/notification-player.schema';
import { ChampionshipModule } from '@modules/championship/championship.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterTeamRepository } from './register-team.repository';
import { OrganizationRepository } from '@modules/organization/organization.repository';

@Module({
  providers: [RegisterTeamService],
  controllers: [RegisterTeamController],
  imports: [
    TypeOrmModule.forFeature([RegisterTeamRepository, OrganizationRepository]),
    MongooseModule.forFeature([
      { name: 'NotificationPlayer', schema: NotificationPlayerSchema },
    ]),
    ChampionshipModule,
  ],
})
export class RegisterTeamModule {}
