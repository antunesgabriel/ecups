import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { OrganizationRepository } from './organization.repository';
import { OrganizationCreateDTO } from './dto/organization-create.dto';
import { OrganizationEntity } from '@models/organization.entity';
import { IMember } from './member.interface';
import { classToPlain } from 'class-transformer';
import { MemberRepository } from '@modules/member/member.repository';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(OrganizationRepository)
    private readonly _organizationRepository: OrganizationRepository,
    @InjectRepository(MemberRepository)
    private readonly _memberRepository: MemberRepository,
  ) {}

  async create(
    organization: OrganizationCreateDTO,
    member: IMember,
  ): Promise<any> {
    if (
      await this._organizationRepository.findOne({ name: organization.name })
    ) {
      throw new BadRequestException(
        `O nome: ${organization.name} já está sendo utilizado`,
      );
    }

    if (
      await this._organizationRepository.findOne({ email: organization.email })
    ) {
      throw new BadRequestException(
        `O email: ${organization.email} já está sendo utilizado`,
      );
    }

    if (
      await this._organizationRepository.findOne({
        email: organization.nickname,
      })
    ) {
      throw new BadRequestException(
        `O apelido: ${organization.nickname} já está sendo utilizado`,
      );
    }

    const newOrganization = this._organizationRepository.create(organization);
    const addMember = await this._memberRepository.findOne({
      email: member.email,
    });

    newOrganization.members = [addMember];

    await this._organizationRepository.save(newOrganization);

    return {
      message: 'Organização criada com succeso. Efetue login novamente',
    };
  }

  async findByNickname(nickname: string): Promise<OrganizationEntity | null> {
    return await this._organizationRepository.findOne({ nickname });
  }

  async show(nickname: string): Promise<any> {
    const organization = await this._organizationRepository.findOne({
      nickname,
    });

    if (!organization) {
      throw new BadRequestException('Organização não existe');
    }

    return classToPlain(organization);
  }
}
