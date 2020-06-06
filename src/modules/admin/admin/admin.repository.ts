import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';

@EntityRepository(UserEntity)
export class AdminRepository extends Repository<UserEntity> {}
