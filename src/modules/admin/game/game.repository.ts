import { EntityRepository, Repository } from 'typeorm';
import { GameEntity } from '@models/game.entity';

@EntityRepository(GameEntity)
export class GameRepository extends Repository<GameEntity> {}
