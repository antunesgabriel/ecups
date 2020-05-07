import { Repository, EntityRepository } from 'typeorm';
import { UserEntity } from '@models/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
