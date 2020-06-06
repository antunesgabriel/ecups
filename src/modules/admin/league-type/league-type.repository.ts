import { EntityRepository, Repository } from 'typeorm';
import { LeagueTypeEntity } from '@entities/leagueType.entity';

@EntityRepository(LeagueTypeEntity)
export class LeagueTypeRepository extends Repository<LeagueTypeEntity> {}
