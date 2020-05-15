import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@models/user.entity';
import { RoleEntity } from '@models/role.entity';
import { LeagueEntity } from '@models/league.entity';
import { LeagueTypeEntity } from '@models/leagueType.entity';
import { GameEntity } from '@models/game.entity';
import { AddressEntity } from '@models/address.entity';
import { TeamEntity } from '@models/team.entity';

export default TypeOrmModule.forRoot({
  type: 'postgres',
  host: String(process.env.APP_DB_HOST),
  port: parseInt(process.env.APP_DB_PORT),
  username: String(process.env.APP_DB_USER),
  password: String(process.env.APP_DB_PASS),
  database: String(process.env.APP_DB_NAME),
  entities: [
    UserEntity,
    RoleEntity,
    LeagueEntity,
    LeagueTypeEntity,
    GameEntity,
    AddressEntity,
    TeamEntity,
  ],
  synchronize: true,
});
