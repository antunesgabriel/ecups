import { Module } from '@nestjs/common';
import { TeamShieldController } from './team-shield.controller';
import { TeamModule } from '@modules/team/team.module';

@Module({
  controllers: [TeamShieldController],
  imports: [TeamModule],
})
export class TeamShieldModule {}
