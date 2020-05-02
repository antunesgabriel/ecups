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

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(TeamRepository)
    private readonly _teamRepository: TeamRepository,
    @InjectModel('TeamInvitationPlayer')
    private readonly _invitationPlayerModel: Model<TeamInvitationPlayer>,
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
        })
        .limit(options.limit)
        .skip(options.skip)
        .exec();

      return list;
    }

    list = await this._invitationPlayerModel
      .find({
        player: player.playerId,
        accept: false,
      })
      .limit(options.limit)
      .skip(options.skip)
      .exec();

    return list;
  }
}
