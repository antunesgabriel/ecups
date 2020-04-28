import { Repository, EntityRepository } from 'typeorm';
import { ChampionshipEntity } from '@models/championship.entity';

@EntityRepository(ChampionshipEntity)
export class ChampionshipRepository extends Repository<ChampionshipEntity> {}
