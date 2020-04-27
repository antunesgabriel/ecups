import { PlayerEntity } from '@models/player.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(PlayerEntity)
export class PlayerRepository extends Repository<PlayerEntity> {}
