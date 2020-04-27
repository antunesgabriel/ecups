import { Repository, EntityRepository } from 'typeorm';
import { MemberEntity } from '@models/member.entity';

@EntityRepository(MemberEntity)
export class MemberRepository extends Repository<MemberEntity> {}
