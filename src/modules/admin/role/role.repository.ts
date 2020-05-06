import { EntityRepository, Repository } from 'typeorm';
import { RoleEntity } from '@models/role.entity';

@EntityRepository(RoleEntity)
export class RoleRepository extends Repository<RoleEntity> {}
