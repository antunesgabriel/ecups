import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberRepository } from './member.repository';
import { MemberEntity } from '@models/member.entity';
import { OrganizationService } from '@modules/organization/organization.service';
import { MemberCreateDTO } from './dto/member-create.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberRepository)
    private readonly _memberRepository: MemberRepository,
    private readonly _organizationService: OrganizationService,
  ) {}

  async create(member: MemberCreateDTO): Promise<any> {
    if (await this._memberRepository.findOne({ email: member.email })) {
      throw new BadRequestException(
        `O email: ${member.email} já está sendo utilizado`,
      );
    }

    const newMember = this._memberRepository.create(member);

    await this._memberRepository.save(newMember);

    return { name: 'Perfil criado com succeso' };
  }

  async findByEmail(email: string): Promise<MemberEntity | null> {
    const member = await this._memberRepository.findOne({
      where: { email },
      relations: ['organization'],
    });

    return member;
  }

  async update(email: string, data: any): Promise<any> {
    const result = await this._memberRepository.update({ email }, data);
    return result;
  }
}
