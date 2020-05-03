import { EntityRepository, Repository } from 'typeorm';
import { RegisterTeamEntity } from '@models/registerTeam.entity';

@EntityRepository(RegisterTeamEntity)
export class RegisterTeamRepository extends Repository<RegisterTeamEntity> {}
