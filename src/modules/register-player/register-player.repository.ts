import { EntityRepository, Repository } from 'typeorm';
import { RegisterPlayerEntity } from '@models/registerPlayer.entity';

@EntityRepository(RegisterPlayerEntity)
export class RegisterPlayerRepository extends Repository<
  RegisterPlayerEntity
> {}
