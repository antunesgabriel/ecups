import { Module } from '@nestjs/common';
import { RegisterTeamService } from './register-team.service';
import { RegisterTeamController } from './register-team.controller';

@Module({
  providers: [RegisterTeamService],
  controllers: [RegisterTeamController]
})
export class RegisterTeamModule {}
