import { Module } from '@nestjs/common';
import { LeagueTypeController } from './league-type.controller';
import { LeagueTypeService } from './league-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeagueTypeRepository } from './league-type.repository';

@Module({
  controllers: [LeagueTypeController],
  providers: [LeagueTypeService],
  imports: [TypeOrmModule.forFeature([LeagueTypeRepository])],
  exports: [LeagueTypeService],
})
export class LeagueTypeModule {}
