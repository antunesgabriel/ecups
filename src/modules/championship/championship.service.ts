import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

import { ChampionshipRepository } from './championship.repository';
import { IMember } from '@utils/member.interface';
import { ChampionshipEntity } from '@models/championship.entity';
import { OrganizationService } from '@modules/organization/organization.service';
import { ChampionshipCreateDTO } from './dto/championship-create.dto';

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
      .where('champ.organization.nickname = :organization', {
        organization: member.organization,
      })
      .orderBy('champ.createdAt', 'DESC');

    return paginate<ChampionshipEntity>(query, options);
  }

  async create(
    championship: ChampionshipCreateDTO,
    member: IMember,
  ): Promise<any> {
    const organization = await this._organizationService.findByNickname(
      member.organization,
    );

    const newChampionship = this._championshipRepository.create(championship);
    newChampionship.organization = organization;
    const saved = await this._championshipRepository.save(newChampionship);

    return { message: 'Campeonato criado', championship: saved };
  }
}
