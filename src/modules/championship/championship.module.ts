import { Module } from '@nestjs/common';
import { ChampionshipController } from './championship.controller';
import { ChampionshipService } from './championship.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChampionshipRepository } from './championship.repository';
import { OrganizationModule } from '@modules/organization/organization.module';

@Module({
  controllers: [ChampionshipController],
  providers: [ChampionshipService],
  imports: [
    TypeOrmModule.forFeature([ChampionshipRepository]),
    OrganizationModule,
  ],
})
export class ChampionshipModule {}
