import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isBefore, format } from 'date-fns';

import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

import { RegisterTeamRepository } from './register-team.repository';
import { OrganizationRepository } from '@modules/organization/organization.repository';
import { NotificationPlayer } from '@shared/notification-player.model';
import { NotificationMember } from '@shared/notification-member.model';
import { ChampionshipService } from '@modules/championship/championship.service';
import { RegisterTeamCreateDTO } from './dto/register-team-create.dto';
import { IPlayer } from '@utils/player.interface';
import { TeamRepository } from '@modules/team/team.repository';
import { TeamEntity } from '@models/team.entity';
import { ChampionshipEntity } from '@models/championship.entity';
import { RegisterUpdateDTO } from '@shared/register-update.dto';
import { IMember } from '@utils/member.interface';
import { RegisterTeamEntity } from '@models/registerTeam.entity';

@Injectable()
export class RegisterTeamService {
  constructor(
    @InjectRepository(RegisterTeamRepository)
    private readonly _registerTeamRepository: RegisterTeamRepository,
    @InjectRepository(OrganizationRepository)
    private readonly _organizationRepository: OrganizationRepository,
    @InjectRepository(TeamRepository)
    private readonly _teamRepository: TeamRepository,
    @InjectModel('NotificationPlayer')
    private readonly _notificationPlayerModel: Model<NotificationPlayer>,
    @InjectModel('NotificationMember')
    private readonly _notificationMemberModel: Model<NotificationMember>,
    private readonly _championshipService: ChampionshipService,
  ) {}

  async paginate(
    options: IPaginationOptions,
    user,
    championshipId: number,
  ): Promise<Pagination<RegisterTeamEntity>> {
    const query = this._registerTeamRepository.createQueryBuilder('register');

    if (user.isPlayer) {
      query
        .innerJoinAndSelect('register.organization', 'organization')
        .innerJoinAndSelect('register.championship', 'championship')
        .where('register.team = :teamId', {
          teamId: user.team,
        })
        .orderBy('register.createdAt', 'DESC');
    }

    if (user.isMember) {
      if (!user.organization) {
        throw new BadRequestException(
          'É preciso fazer parte de uma organização para ver os pedidos de inscrições',
        );
      }

      const aditional = !!championshipId
        ? ` AND register.championship = ${championshipId}`
        : '';
      const organization = await this._organizationRepository.findOne({
        nickname: user.organization,
      });

      query
        .innerJoinAndSelect('register.organization', 'organization')
        .innerJoinAndSelect('register.championship', 'championship')
        .innerJoinAndSelect('register.team', 'team')
        .where('organization.organizationId = :organizationId' + aditional, {
          organizationId: organization.organizationId,
        })
        .orderBy('register.createdAt', 'DESC');
    }

    return paginate<RegisterTeamEntity>(query, options);
  }

  async store(
    register: RegisterTeamCreateDTO,
    authPlayer: IPlayer,
  ): Promise<any> {
    const championship = await this._championshipService.findById(
      register.championshipId,
    );

    const team = await this._teamRepository.findOne({
      teamId: register.teamId,
    });

    this.validateChampion(team, championship);

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

    if (team.leader.playerId !== authPlayer.playerId) {
      throw new UnauthorizedException(
        'Somente o lider do time pode realizar inscrições em campeonatos',
      );
    }

    if (
      await this._registerTeamRepository.findOne({
        where: { team, championship },
      })
    ) {
      throw new BadRequestException(
        'Este time já possui cadastro no campeonato',
      );
    }

    const organization = championship.organization;

    const newRegister = this._registerTeamRepository.create({
      team,
      championship,
      organization,
    });

    const saved = await this._registerTeamRepository.save(newRegister);
    const content =
      `O time ${team.name} acaba de enviar uma inscrição para o campeonato: ${championship.name}.` +
      ' Verfique a inscrição na aba Inscrições';

    const notification = await this._notificationMemberModel.create({
      member: organization.members[0].memberId,
      content,
    });

    notification.save();

    return {
      message:
        'Sua inscrição foi enviada para analise da organização, aguarde a resposta',
      register: saved,
    };
  }

  async update(
    registerId: number,
    updateRegister: RegisterUpdateDTO,
    member: IMember,
  ): Promise<any> {
    const register = await this._registerTeamRepository.findOne({
      where: { registerId },
      relations: ['organization', 'championship', 'team'],
    });

    if (!register) {
      throw new BadRequestException('Essa inscrição não existe');
    }

    const organization = register.organization;
    const team = register.team;
    const championship = register.championship;

    if (!member.organization || organization.nickname !== member.organization) {
      throw new UnauthorizedException(
        'Essa inscrição não pertence a um campeonato de sua organização, entre em contato com o suporte da eCups',
      );
    }

    if (register.confirmationDate || register.refusedDate) {
      const status = register.confirmationDate ? 'Confirmada' : 'Recusada';
      throw new BadRequestException(
        `Essa inscrição já foi atualizada anteriormente para o status de: ${status}. ` +
          'Entre em contato com o suporte do sistema para modificar.',
      );
    }

    const dateNow = new Date();

    const confirmationDate = updateRegister.confirmedRegister ? dateNow : null;

    const refusedDate = updateRegister.confirmedRegister ? null : dateNow;

    const refusedReason = updateRegister.confirmedRegister
      ? null
      : updateRegister.refusedReason;

    const result = await this._registerTeamRepository.update(
      { registerId },
      { confirmationDate, refusedDate, refusedReason },
    );

    if (!result.affected) {
      throw new BadRequestException(
        'Ouve um erro ao atualizar a inscrição, entre em contato com o suporte da eCups',
      );
    }

    let content = null;

    if (updateRegister.confirmedRegister) {
      const date = format(championship.start, 'dd/M/yyyy');
      const hours = format(championship.start, 'H:m');
      content =
        `Parabens!A sua incrição do seu time no campeonato ${championship.name} ` +
        `foi confirmada pela organização do campeonato (${organization.name}). ` +
        `As partidas do campeonato iniciarão a partir de ${date}ás ${hours} hrs
      `;
    } else {
      content =
        `A sua incrição no campeonato ${championship.name} foi recusada.` +
        `A organização ${organization.name} deu o seguinte motivo: ${updateRegister.refusedReason}`;
    }

    const notification = await this._notificationPlayerModel.create({
      player: team.leader.playerId,
      content,
    });

    await notification.save();

    return {
      message: `Inscrição ${
        updateRegister.confirmedRegister ? 'confirmada' : 'recusada'
      } com sucesso!`,
    };
  }

  validateChampion(team: TeamEntity, championship: ChampionshipEntity): void {
    if (!team) {
      throw new BadRequestException('O time informado não existe');
    }

    if (!championship) {
      throw new BadRequestException('O campeonato informado não existe');
    }

    if (!championship.forTeams) {
      throw new UnauthorizedException('Este campeonate não é para times');
    }
  }
}
