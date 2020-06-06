import { EntityRepository, Repository } from 'typeorm';
import { LeagueEntity } from '@entities/league.entity';

@EntityRepository(LeagueEntity)
export class LeagueRepository extends Repository<LeagueEntity> {}
