import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamRepository } from '@modules/team/team.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamInvitationPlayer } from './team-invitation-player';
import { IPlayer } from '@utils/player.interface';
import { InvitationPlayerCreateDTO } from './dto/invitation-create.dto';
import { InvitationPlayerUpdateDTO } from './dto/invitation-update.dto';
import { PlayerService } from '@modules/player/player.service';
import { NotificationPlayer } from '@modules/register-player/notification-player';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(TeamRepository)
    private readonly _teamRepository: TeamRepository,
    @InjectModel('TeamInvitationPlayer')
    private readonly _invitationPlayerModel: Model<TeamInvitationPlayer>,
    private readonly _playerService: PlayerService,
    @InjectModel('NotificationPlayer')
    private readonly _notificationPlayerModel: Model<NotificationPlayer>,
  ) {}

  async paginate(
    options,
    teamId: number,
    player: IPlayer,
  ): Promise<TeamInvitationPlayer[]> {
    let list = null;
    if (teamId) {
      const team = await this._teamRepository.findOne({
        where: { teamId },
        relations: ['leader'],
      });

      if (!team) {
        throw new BadRequestException('Esse time não existe');
      }

      if (team.leader.playerId !== player.playerId) {
        throw new UnauthorizedException(
          'Somente o lider pode ver os convites enviados',
        );
      }

      list = this._invitationPlayerModel
        .find({
          accept: false,
          team: teamId,
          read: false,
        })
        .limit(options.limit)
        .skip(options.skip)
        .sort({ createdAt: 'desc' })
        .exec();

      return list;
    }

    list = await this._invitationPlayerModel
      .find({
        player: player.nickName,
        accept: false,
        read: false,
      })
      .limit(options.limit)
      .skip(options.skip)
      .sort({ createdAt: 'desc' })
      .exec();

    return list;
  }

  async store(
    invitation: InvitationPlayerCreateDTO,
    player: IPlayer,
  ): Promise<any> {
    const team = await this._teamRepository.findOne({
      where: { teamId: invitation.teamId },
      relations: ['leader'],
    });

    if (!team) {
      throw new BadRequestException('O time encontrado não existe');
    }

    if (!player.team || team.leader.playerId !== player.playerId) {
      throw new UnauthorizedException(
        'Somente o líder do time informado pode fazer convites',
      );
    }

    const newInvitation = await this._invitationPlayerModel.create({
      player: invitation.nickName,
      team: team.teamId,
      message: invitation.message ? invitation.message : '',
    });

    await newInvitation.save();

    return { message: 'Convite enviado com sucesso!' };
  }

  async update(
    awnser: InvitationPlayerUpdateDTO,
    player: IPlayer,
  ): Promise<any> {
    const invitation = await this._invitationPlayerModel.find({
      _id: awnser._id,
      player: player.nickName,
      team: awnser.teamId,
      accept: null,
    });

    if (!invitation) {
      throw new BadRequestException(
        'Esse convite não exite ou ja foi respondido',
      );
    }

    const team = await this._teamRepository.findOne({
      where: { teamId: awnser.teamId },
      relations: ['leader'],
    });
    const currentPlayer = await this._playerService.findByEmail(player.email);

    if (currentPlayer.team || currentPlayer.leaderOf) {
      throw new UnauthorizedException(
        'Você não pode aceitar este convite pois ja faz parte de um time',
      );
    }

    if (!awnser.accept) {
      await this._invitationPlayerModel.findByIdAndUpdate(awnser._id, {
        accept: false,
        read: true,
      });

      return { message: 'Convite recusado com sucesso!' };
    }

    await this._playerService.updateTeam(currentPlayer.playerId, team);

    await this._invitationPlayerModel.findByIdAndUpdate(awnser._id, {
      accept: true,
      read: true,
    });

    await this._notificationPlayerModel.create({
      player: team.leader.playerId,
      content:
        `Mais um membro no time! O jogador ${currentPlayer.nickName}` +
        ' aceitou o convite para entrar o seu time',
    });

    return {
      message: `Convite aceito com sucesso! Agora você faz parte do time ${team.name}`,
    };
  }
}
