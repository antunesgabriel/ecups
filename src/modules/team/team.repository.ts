import { EntityRepository, Repository } from 'typeorm';
import { TeamEntity } from '@entities/team.entity';

@EntityRepository(TeamEntity)
export class TeamRepository extends Repository<TeamEntity> {}
