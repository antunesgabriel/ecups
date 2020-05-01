import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { InjectModel } from '@nestjs/mongoose';

import { RegisterPlayerRepository } from './register-player.repository';
import { ChampionshipService } from '@modules/championship/championship.service';
import { RegisterPlayerEntity } from '@models/registerPlayer.entity';
import { OrganizationRepository } from '@modules/organization/organization.repository';
import { RegisterCreateDTO } from '@shared/register-create.dto';
import { IPlayer } from '@utils/player.interface';
import { PlayerRepository } from '@modules/player/player.repository';
import { RegisterUpdateDTO } from '@shared/register-update.dto';
import { IMember } from '@utils/member.interface';
import { isBefore, format } from 'date-fns';
import { INotificationPlayer } from '@interfaces/notification-player.interface';

@Injectable()
export class RegisterPlayerService {
  constructor(
    @InjectRepository(RegisterPlayerRepository)
    private readonly _registerPlayerRepository: RegisterPlayerRepository,
    private readonly _championshipService: ChampionshipService,
    @InjectRepository(OrganizationRepository)
    private readonly _organizationRepository: OrganizationRepository,
    @InjectRepository(PlayerRepository)
    private readonly _playerRepository: PlayerRepository,
    @InjectModel('NotificationPlayer')
    private readonly _notificationPlayerModel: Model<INotificationPlayer>,
  ) {}

  async paginate(
    options: IPaginationOptions,
    user,
    championshipId,
  ): Promise<Pagination<RegisterPlayerEntity>> {
    const query = this._registerPlayerRepository.createQueryBuilder('register');

    if (user.isPlayer) {
      query
        .innerJoinAndSelect('register.organization', 'organization')
        .innerJoinAndSelect('register.championship', 'championship')
        .where('register.player = :playerId', {
          playerId: user.playerId,
        })
        .orderBy('register.createdAt', 'DESC');
    }

    if (user.isMember) {
      const aditional = !!championshipId
        ? ` AND register.championship = ${championshipId}`
        : '';
      const organization = await this._organizationRepository.findOne({
        nickname: user.organization,
      });

      query
        .innerJoinAndSelect('register.organization', 'organization')
        .innerJoinAndSelect('register.championship', 'championship')
        .innerJoinAndSelect('register.player', 'player')
        .where('organization.organizationId = :organizationId' + aditional, {
          organizationId: organization.organizationId,
        })
        .orderBy('register.createdAt', 'DESC');
    }

    return paginate<RegisterPlayerEntity>(query, options);
  }

  async store(register: RegisterCreateDTO, authPlayer: IPlayer): Promise<any> {
    const championship = await this._championshipService.findById(
      register.championshipId,
    );

    if (!championship) {
      throw new BadRequestException('Este campeonato não existe');
    }

    if (championship.forTeams) {
      throw new BadRequestException(
        'Este campeonato só permite inscrições de times',
      );
    }

    if (isBefore(new Date(), new Date(championship.registrationsStart))) {
      throw new BadRequestException(
        'As inscrições para este campeonato não estão abertas',
      );
    }

    if (isBefore(championship.registrationsEnd, new Date())) {
      throw new BadRequestException(
        'As inscrições para este campeonato estão fechadas',
      );
    }

    const organization = championship.organization;
    const player = await this._playerRepository.findOne({
      email: authPlayer.email,
    });

    if (
      await this._registerPlayerRepository.findOne({ championship, player })
    ) {
      throw new UnauthorizedException(
        'Você já possui inscrição neste campeonato.',
      );
    }

    const newRegister = this._registerPlayerRepository.create({
      organization,
      player,
      championship,
    });
    await this._registerPlayerRepository.save(newRegister);

    return {
      message: `Pedido de inscrição efetuado! Aguarde a ${organization.name} confirma sua inscrição`,
    };
  }

  async update(
    updateRegister: RegisterUpdateDTO,
    member: IMember,
    registerId: number,
  ): Promise<any> {
    const register = await this._registerPlayerRepository.findOne({
      where: { registerId },
      relations: ['organization', 'championship', 'player'],
    });

    if (!register) {
      throw new BadRequestException('Inscrição não encontrada');
    }

    if (register.confirmationDate || register.refusedDate) {
      const status = register.confirmationDate ? 'Confirmada' : 'Recusada';
      throw new BadRequestException(
        `Essa inscrição já foi atualizada anteriormente para o status de: ${status}. ` +
          'Entre em contato com o suporte do sistema para modificar.',
      );
    }

    const organization = register.organization;
    const player = register.player;
    const championship = register.championship;

    if (championship.forTeams) {
      throw new BadRequestException(
        'Ops ocorreu um erro ao atualizar a inscrição, entre em contato com o suporte da FreeChampions',
      );
    }

    if (!member.organization || organization.nickname !== member.organization) {
      throw new UnauthorizedException(
        'Essa inscrição não pertence a um campeonato de sua organização, entre em contato com o suporte da FreeChampions',
      );
    }

    const dateNow = new Date();

    const confirmationDate = updateRegister.confirmedRegister ? dateNow : null;

    const refusedDate = updateRegister.confirmedRegister ? null : dateNow;

    const refusedReason = updateRegister.confirmedRegister
      ? null
      : updateRegister.refusedReason;

    const result = await this._registerPlayerRepository.update(
      { registerId },
      { confirmationDate, refusedDate, refusedReason },
    );

    if (!result.affected) {
      throw new BadRequestException(
        'Ouve um erro ao atualizar a inscrição, entre em contato com o suporte da FreeChampions',
      );
    }

    let content = null;

    if (updateRegister.confirmedRegister) {
      const date = format(championship.start, 'dd/M/yyyy');
      const hours = format(championship.start, 'H:m');
      content =
        `Parabens!A sua incrição no campeonato ${championship.name} ` +
        `foi confirmada pela organização do campeonato (${organization.name}). ` +
        `As partidas do campeonato iniciarão a partir de ${date}ás ${hours} hrs
      `;
    } else {
      content =
        `A sua incrição no campeonato ${championship.name} foi recusada.` +
        `A organização ${organization.name} deu o seguinte motivo: ${updateRegister.refusedReason}`;
    }

    const notification = await this._notificationPlayerModel.create({
      player: player.playerId,
      content,
    });

    await notification.save();

    return {
      message: `Inscrição ${
        updateRegister.confirmedRegister ? 'confirmada' : 'recusada'
      } com sucesso!`,
    };
  }

  async destroy(registerId: number, user): Promise<any> {
    const register = await this._registerPlayerRepository.findOne({
      where: { registerId },
      relations: ['player', 'organization'],
    });

    if (!register) {
      throw new BadRequestException(
        'Não foi possivel encontrar a inscrição solicitada',
      );
    }

    if (user.isPlayer && user.playerId !== register.player.playerId) {
      throw new BadRequestException(
        'Você não tem permissão de excluir esta inscrição',
      );
    }

    if (user.isMember && user.organization !== register.organization.nickname) {
      throw new BadRequestException(
        'Você não tem permissão de excluir esta inscrição',
      );
    }

    await this._registerPlayerRepository.delete({ registerId });

    return { message: 'Inscrição excluida com sucesso' };
  }
}
