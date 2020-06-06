import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@entities/user.entity';
import { RoleEntity } from '@entities/role.entity';
import { LeagueEntity } from '@entities/league.entity';
import { LeagueTypeEntity } from '@entities/leagueType.entity';
import { GameEntity } from '@entities/game.entity';
import { AddressEntity } from '@entities/address.entity';
import { TeamEntity } from '@entities/team.entity';

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
