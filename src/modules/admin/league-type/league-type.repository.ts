import { EntityRepository, Repository } from 'typeorm';
import { LeagueTypeEntity } from '@models/leagueType.entity';

@EntityRepository(LeagueTypeEntity)
export class LeagueTypeRepository extends Repository<LeagueTypeEntity> {}
