import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

import { IFeedback } from '@interfaces/feedback.interface';
import { LeagueTypeRepository } from './league-type.repository';
import { LeagueTypeEntity } from '@models/leagueType.entity';
import { LeagueTypeDTO } from './dto/league-type.dto';

@Injectable()
export class LeagueTypeService {
  constructor(
    @InjectRepository(LeagueTypeRepository)
    private readonly _leagueTypeRepository: LeagueTypeRepository,
  ) {}

  async index(
    options: IPaginationOptions,
  ): Promise<Pagination<LeagueTypeEntity>> {
    const query = this._leagueTypeRepository
      .createQueryBuilder('league')
      .orderBy('type', 'ASC');

    return paginate<LeagueTypeEntity>(query, options);
  }

  async create(leagueDTO: LeagueTypeDTO): Promise<IFeedback> {
    if (await this._leagueTypeRepository.findOne({ type: leagueDTO.type })) {
      throw new BadRequestException('Já existe uma tipo de liga com este nome');
    }
    await this._leagueTypeRepository.save(
      this._leagueTypeRepository.create(leagueDTO),
    );

    return { message: 'Liga criada' };
  }

  async update(
    leagueTypeId: number,
    leagueDTO: LeagueTypeDTO,
  ): Promise<IFeedback> {
    if (!(await this._leagueTypeRepository.findOne({ leagueTypeId }))) {
      throw new BadRequestException(
        'O tipo de liga informado não possui cadastro',
      );
    }

    await this._leagueTypeRepository.update(
      { leagueTypeId },
      { type: leagueDTO.type },
    );

    return { message: 'Tipo de liga atualizada com sucesso' };
  }

  async destroy(leagueTypeId: number): Promise<IFeedback> {
    if (!(await this._leagueTypeRepository.findOne({ leagueTypeId }))) {
      throw new BadRequestException(
        'Tipo de liga informado não está cadastrada',
      );
    }

    await this._leagueTypeRepository.delete({ leagueTypeId });

    return { message: 'Função excluida com succeso' };
  }

  async all(): Promise<LeagueTypeEntity[] | null> {
    return await this._leagueTypeRepository.find();
  }
}
