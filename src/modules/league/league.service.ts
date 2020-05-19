import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

import { LeagueRepository } from './league.repository';
import { LeagueEntity } from '@models/league.entity';
import { IUser } from '@utils/user.interface';
import { IFeedback } from '@interfaces/feedback.interface';
import { LeagueCreateDTO } from './dto/league-create.dto';
import { UserService } from '@modules/user/user.service';

import leagueDatesValidate from '@helpers/leagueDatesValidate';
import { ILeagueFeedback } from './league-feedback.interface';
import { LeagueUpdateDTO } from './dto/league-update.dto';
import { LeagueTypeService } from '@modules/admin/league-type/league-type.service';
import { GameService } from '@modules/admin/game/game.service';
import { subDays, addYears } from 'date-fns';
import { calcPorcentage } from '@helpers/porcentage';

@Injectable()
export class LeagueService {
  constructor(
    @InjectRepository(LeagueRepository)
    private readonly _leagueRepository: LeagueRepository,
    private readonly _userService: UserService,
    private readonly _leagueTypeService: LeagueTypeService,
    private readonly _gameService: GameService,
  ) {}

  async index(
    options: IPaginationOptions,
    authUser: IUser,
  ): Promise<Pagination<LeagueEntity>> {
    const query = this._leagueRepository
      .createQueryBuilder('league')
      .leftJoinAndSelect('league.game', 'game')
      .leftJoinAndSelect('league.leagueType', 'leagueType')
      .leftJoinAndSelect('league.user', 'user');

    if (authUser.role === 'PLAYER') {
      query.where(`user.userId = ${authUser.userId}`);
    }

    query.orderBy('league.createdAt', 'DESC');

    return paginate<LeagueEntity>(query, options);
  }

  async create(
    leagueCreateDTO: LeagueCreateDTO,
    authUser: IUser,
  ): Promise<ILeagueFeedback> {
    const user = await this._userService.findByNickname(authUser.nickname);

    if (
      await this._leagueRepository.findOne({ league: leagueCreateDTO.league })
    ) {
      throw new BadRequestException('Já existe uma liga com este nome');
    }

    const result = leagueDatesValidate(leagueCreateDTO);

    if (!result.valid) {
      throw new BadRequestException(result.message);
    }

    const game = await this._gameService.findById(leagueCreateDTO.gameId);
    if (!game) {
      throw new BadRequestException('O game da liga não está cadastrado');
    }

    const leagueType = await this._leagueTypeService.findById(
      leagueCreateDTO.leagueTypeId,
    );

    if (!leagueType) {
      throw new BadRequestException(
        'O tipo de competição da liga não está cadastrada',
      );
    }

    const newLeague = this._leagueRepository.create({
      ...leagueCreateDTO,
      user,
      leagueType,
      game,
    });
    const league = await this._leagueRepository.save(newLeague);

    return { message: 'Liga criada com sucesso', league };
  }

  async update(
    leagueId: number,
    leagueUpdateDTO: LeagueUpdateDTO,
    authUser: IUser,
  ): Promise<ILeagueFeedback> {
    // const user = await this._userService.findByNickname(authUser.nickname);

    const leagueSelect = await this._leagueRepository.findOne({
      where: { leagueId },
      relations: ['user', 'leagueType', 'game'],
    });

    if (!leagueSelect) {
      throw new BadRequestException('A liga informada não existe');
    }

    if (
      authUser.role === 'PLAYER' &&
      leagueSelect.user.userId !== authUser.userId
    ) {
      if (!leagueSelect) {
        throw new BadRequestException(
          'Você não pode editar esta liga, pois pertence a outro usuario',
        );
      }
    }

    if (
      leagueSelect.league !== leagueUpdateDTO.league &&
      (await this._leagueRepository.findOne({ league: leagueUpdateDTO.league }))
    ) {
      throw new BadRequestException('Já existe uma liga com este nome');
    }

    leagueSelect.league = leagueUpdateDTO.league;
    leagueSelect.rules = leagueUpdateDTO.rules;
    leagueSelect.description = leagueUpdateDTO.description;
    leagueSelect.roundTrip = leagueUpdateDTO.roundTrip;
    leagueSelect.maxParticipants = leagueUpdateDTO.maxParticipants;
    leagueSelect.active = leagueUpdateDTO.active;

    const result = leagueDatesValidate(leagueUpdateDTO);

    if (!result.valid) {
      throw new BadRequestException(result.message);
    }

    leagueSelect.leagueStart = leagueUpdateDTO.leagueStart;
    leagueSelect.leagueEnd = leagueUpdateDTO.leagueEnd;

    // TODO: Poder exigir ou não endereço caso não aja inscrições
    // no campeonato. Poder atualiza se é pra players ou team tbm

    const leagueUpdated = await this._leagueRepository.save(leagueSelect);

    return { message: 'Liga atualizada com sucesso', league: leagueUpdated };
  }

  async destroy(leagueId: number, authUser: IUser): Promise<IFeedback> {
    const leagueSelect = await this._leagueRepository.findOne({
      where: { leagueId },
      relations: ['user', 'leagueType', 'game'],
    });

    if (!leagueSelect) {
      throw new BadRequestException('A liga informada não existe');
    }

    if (
      authUser.role === 'PLAYER' &&
      leagueSelect.user.userId !== authUser.userId
    ) {
      if (!leagueSelect) {
        throw new BadRequestException(
          'Você não pode editar esta liga, pois pertence a outro usuario',
        );
      }
    }

    await this._leagueRepository.softDelete({
      leagueId: leagueSelect.leagueId,
    });

    return { message: 'Liga deletada com sucesso' };
  }

  async all(
    options: IPaginationOptions,
    leagueId: number = null,
  ): Promise<Pagination<LeagueEntity> | any> {
    if (leagueId) {
      const league = await this._leagueRepository.findOne({ leagueId });

      if (!league) {
        throw new BadRequestException('Liga não encontrada');
      }

      return { league: league };
    }
    const query = this._leagueRepository
      .createQueryBuilder('league')
      .innerJoinAndSelect('league.game', 'game')
      .innerJoinAndSelect('league.leagueType', 'leagueType')
      .innerJoinAndSelect('league.user', 'user')
      .where(
        'league.active = :active AND league.leagueStart BETWEEN :start AND :end',
        {
          active: true,
          start: new Date(),
          end: addYears(new Date(), 1),
        },
      )
      .orderBy('league.createdAt', 'DESC');

    return paginate<LeagueEntity>(query, options);
  }

  async updateThumb(
    leagueId: number,
    filename: string,
    authUser: IUser,
  ): Promise<ILeagueFeedback> {
    const leagueSelect = await this._leagueRepository.findOne({
      where: { leagueId },
      relations: ['user', 'leagueType', 'game'],
    });

    if (!leagueSelect) {
      throw new BadRequestException('A liga informada não existe');
    }

    if (
      authUser.role === 'PLAYER' &&
      leagueSelect.user.userId !== authUser.userId
    ) {
      if (!leagueSelect) {
        throw new BadRequestException(
          'Você não pode editar esta liga, pois pertence a outro usuario',
        );
      }
    }

    leagueSelect.thumb = filename;

    const leagueUpdated = await this._leagueRepository.save(leagueSelect);

    return { message: 'Thumb atualizada com sucesso', league: leagueUpdated };
  }

  async info(): Promise<any> {
    const now = new Date();
    const before = subDays(now, 30);
    const beforeBefore = subDays(before, 30);

    const queryValorFinal = this._leagueRepository
      .createQueryBuilder('league')
      .where('league.createdAt BETWEEN :before AND :now', {
        before,
        now,
      });

    const queryValorInicial = this._leagueRepository
      .createQueryBuilder('league')
      .where('league.createdAt BETWEEN :beforeBefore AND :before', {
        beforeBefore,
        before,
      });

    const [final, inicial, total] = await Promise.all([
      queryValorFinal.getCount(),
      queryValorInicial.getCount(),
      this._leagueRepository.count(),
    ]);

    const porcentage = calcPorcentage(inicial, final);

    return {
      actual: final,
      before: inicial,
      porcentage,
      total,
    };
  }

  async findById(
    leagueId: number,
    userId: number = null,
  ): Promise<LeagueEntity | null> {
    if (userId) {
      return await this._leagueRepository
        .createQueryBuilder('league')
        .leftJoinAndSelect('league.user', 'user')
        .leftJoinAndSelect('league.game', 'game')
        .leftJoinAndSelect('league.leagueType', 'leagueType')
        .where('league.leagueId = :leagueId AND user.userId = :userId', {
          leagueId,
          userId,
        })
        .getOne();
    }

    return await this._leagueRepository.findOne({
      where: { leagueId },
      relations: ['user', 'game', 'leagueType'],
    });
  }
}
