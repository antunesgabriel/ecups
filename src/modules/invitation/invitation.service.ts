import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invitation } from './invitation.model';
import { NotificationService } from '@modules/notification/notification.service';
import { TeamService } from '@modules/team/team.service';
import { UserService } from '@modules/user/user.service';
import { InvitationCreateDTO } from './dto/invitation-create.dto';
import { IFeedback } from '@interfaces/feedback.interface';
import { IUser } from '@utils/user.interface';
import { InvitationUpdateDTO } from './dto/invitation-update.dto';
import { TeamEntity } from '@models/team.entity';

@Injectable()
export class InvitationService {
  constructor(
    @InjectModel('Invitation')
    private readonly _invitationModel: Model<Invitation>,
    private readonly _notificationService: NotificationService,
    private readonly _userService: UserService,
    private readonly _teamService: TeamService,
  ) {}

  async index(authUser: IUser): Promise<Invitation[]> {
    const invitations = await this._invitationModel.find({
      userId: authUser.userId,
      accept: null,
    });

    return invitations;
  }

  async create(
    invitationCreateDTO: InvitationCreateDTO,
    authUser: IUser,
  ): Promise<IFeedback> {
    invitationCreateDTO.nickname = invitationCreateDTO.nickname.replace(
      /[\s\W]/gi,
      '',
    );
    const user = await this._userService.findByNickname(authUser.nickname);

    const team = await this._teamService.isBoss(
      invitationCreateDTO.teamId,
      user,
    );

    if (!team) {
      throw new UnauthorizedException(
        'Somente o lider do time pode convidar outros jogadores',
      );
    }

    const player = await this._userService.findByNickname(
      invitationCreateDTO.nickname,
    );

    if (!player) {
      throw new BadRequestException('Não existe um player com este nickname');
    }

    if (
      team.members.some(
        player => player.nickname === invitationCreateDTO.nickname,
      )
    ) {
      throw new BadRequestException('Este player já faz parte deste time');
    }

    if (
      await this._invitationModel
        .findOne({ userId: player.userId, teamId: team.teamId, accept: null })
        .exec()
    ) {
      throw new BadRequestException(
        'Você já fez um convite a este player, aguarde a resposta dele',
      );
    }

    const invitation = new this._invitationModel({
      userId: player.userId,
      teamId: team.teamId,
      teamName: team.team,
    });

    await invitation.save();

    await this._notificationService.create({
      message: `Você recebeu um convite do time ${team.team} acesse a pagina de convites para aceita-lo ou recusar`,
      userId: player.userId,
      link: '/player/invitations',
    });

    await this._notificationService.create({
      message: 'Convite enviado com sucesso!',
      userId: authUser.userId,
    });

    return {
      message: 'Convite enviado com sucesso! Aguarde a resposta do jogador',
    };
  }

  async update(
    invitationUpdateDTO: InvitationUpdateDTO,
    authUser,
  ): Promise<any> {
    const user = await this._userService.findByNickname(authUser.nickname);
    const invitation = await this._invitationModel
      .findOne({
        userId: user.userId,
        _id: invitationUpdateDTO._id,
      })
      .exec();

    if (!invitation) {
      throw new BadRequestException(
        'Não foi possivel responder a este convite pois ele não foi encotrado',
      );
    }

    if (invitationUpdateDTO.accept && user.team) {
      throw new UnauthorizedException(
        `Você não pode aceitar entrar neste time pois ja faz parte do time ${user.team.team}`,
      );
    }

    let team: TeamEntity = null;

    if (invitationUpdateDTO.accept) {
      team = await this._teamService.findById(invitation.teamId);

      if (!team) {
        invitation.accept = false;
        await invitation.save();

        throw new BadRequestException(
          'Ops! Parece que o time deste convite não exite mais :/',
        );
      }

      if (team.members.length >= 7) {
        throw new BadRequestException(
          'O numero maximo de 7 integrante foi atingido',
        );
      }

      await this._userService.setTeam(user, team);

      await this._notificationService.create({
        message: `O player ${user.nickname} aceitou seu convite e agora faz parte do seu time`,
        userId: team.boss.userId,
        link: '/player/team',
      });
    }

    invitation.accept = invitationUpdateDTO.accept;

    await invitation.save();

    return {
      message: invitationUpdateDTO.accept
        ? `Agora você faz parte do ${invitation.teamName}`
        : 'Convite recusado com sucesso',
      team,
    };
  }
}
