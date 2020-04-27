import { Repository, EntityRepository } from 'typeorm';
import { OrganizationEntity } from '@models/organization.entity';

@EntityRepository(OrganizationEntity)
export class OrganizationRepository extends Repository<OrganizationEntity> {}
