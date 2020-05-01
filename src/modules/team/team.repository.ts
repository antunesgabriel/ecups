import { EntityRepository, Repository } from 'typeorm';
import { TeamEntity } from '@models/team.entity';

@EntityRepository(TeamEntity)
export class TeamRepository extends Repository<TeamEntity> {}
