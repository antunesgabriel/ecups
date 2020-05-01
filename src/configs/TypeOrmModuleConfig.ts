import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from '@models/player.entity';
import { TeamEntity } from '@models/team.entity';
import { OrganizationEntity } from '@models/organization.entity';
import { MemberEntity } from '@models/member.entity';
import { ChampionshipEntity } from '@models/championship.entity';
import { RegisterTeamEntity } from '@models/registerTeam.entity';
import { RegisterPlayerEntity } from '@models/registerPlayer.entity';

export default TypeOrmModule.forRoot({
  type: 'postgres',
  host: String(process.env.APP_DB_HOST),
  port: parseInt(process.env.APP_DB_PORT),
  username: String(process.env.APP_DB_USER),
  password: String(process.env.APP_DB_PASS),
  database: String(process.env.APP_DB_NAME),
  entities: [
    PlayerEntity,
    TeamEntity,
    OrganizationEntity,
    MemberEntity,
    ChampionshipEntity,
    RegisterTeamEntity,
    RegisterPlayerEntity,
  ],
  synchronize: true,
});
