import { EntityRepository, Repository } from 'typeorm';
import { LeagueEntity } from '@models/league.entity';

@EntityRepository(LeagueEntity)
export class LeagueRepository extends Repository<LeagueEntity> {}
