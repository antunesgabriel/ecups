import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { add } from 'date-fns';

import { ChampionshipRepository } from './championship.repository';
import { IMember } from '@utils/member.interface';
import { ChampionshipEntity } from '@models/championship.entity';
import { OrganizationService } from '@modules/organization/organization.service';
import { ChampionshipCreateDTO } from './dto/championship-create.dto';
import validateDatesChampionship from '@helpers/validateDatesChampionship';

@Injectable()
export class ChampionshipService {
  constructor(
    @InjectRepository(ChampionshipRepository)
    private readonly _championshipRepository: ChampionshipRepository,
    private readonly _organizationService: OrganizationService,
  ) {}

  async paginate(
    options: IPaginationOptions,
    member: IMember,
  ): Promise<Pagination<ChampionshipEntity>> {
    const query = this._championshipRepository.createQueryBuilder('champ');

    query
      .innerJoin('champ.organization', 'organization')
      .where('organization.nickname = :organization', {
        organization: member.organization,
      })
      .orderBy('champ.createdAt', 'DESC');

    return paginate<ChampionshipEntity>(query, options);
  }

  async create(
    championship: ChampionshipCreateDTO,
    member: IMember,
  ): Promise<any> {
    const {
      registrationsEnd,
      registrationsStart,
      start,
    } = validateDatesChampionship(championship);

    const organization = await this._organizationService.findByNickname(
      member.organization,
    );

    if (
      await this._championshipRepository.findOne({ name: championship.name })
    ) {
      throw new BadRequestException('Já existe um campeonato com este nome');
    }

    const newChampionship = this._championshipRepository.create({
      ...championship,
      start,
      registrationsEnd,
      registrationsStart,
    });
    newChampionship.organization = organization;
    const saved = await this._championshipRepository.save(newChampionship);

    return { message: 'Campeonato criado', championship: saved };
  }

  async destroy(championshipId: number, member: IMember): Promise<any> {
    const organization = await this._organizationService.findByNickname(
      member.organization,
    );

    const result = await this._championshipRepository.delete({
      championshipId,
      organization,
    });

    if (result.affected) {
      return { message: 'Campeonato deletado com sucesso' };
    }

    throw new BadRequestException('Este campeonato não existe');
  }

  async update(
    championshipId: number,
    member: IMember,
    championship: ChampionshipCreateDTO,
  ): Promise<any> {
    const {
      registrationsEnd,
      registrationsStart,
      start,
    } = validateDatesChampionship(championship);

    const organization = await this._organizationService.findByNickname(
      member.organization,
    );

    if (
      await this._championshipRepository.findOne({
        where: `championship_id != ${championshipId} AND name = '${championship.name}'`,
      })
    ) {
      throw new BadRequestException('Já existe um campeonato com este nome');
    }

    const result = await this._championshipRepository.update(
      { championshipId, organization },
      { ...championship, registrationsStart, registrationsEnd, start },
    );

    if (result.affected) {
      return { message: 'Campeonato atualizado com sucesso' };
    }

    throw new BadRequestException('Este campeonato não existe');
  }

  async paginateAll(
    options: IPaginationOptions,
  ): Promise<Pagination<ChampionshipEntity>> {
    const query = this._championshipRepository.createQueryBuilder('champ');

    query
      .innerJoinAndSelect('champ.organization', 'organization')
      .where(
        'champ.active = :active  AND organization.active = :orgActive AND champ.registrationsStart BETWEEN :initIns AND :endIns',
        {
          active: true,
          orgActive: true,
          initIns: new Date(),
          endIns: add(new Date(), { years: 1 }),
        },
      )
      .orderBy('champ.createdAt', 'DESC');

    return paginate<ChampionshipEntity>(query, options);
  }

  async findById(id: number): Promise<ChampionshipEntity | null> {
    return await this._championshipRepository.findOne({
      where: { championshipId: id },
      relations: ['organization'],
    });
  }
}
