import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscription } from './subscription.model';
import { UserService } from '@modules/user/user.service';
import { LeagueService } from '@modules/league/league.service';
import { TeamService } from '@modules/team/team.service';
import { IUser } from '@utils/user.interface';
import { UserEntity } from '@models/user.entity';
import { SubscriptionCreateDTO } from './dto/subscription-create.dto';
import { LeagueEntity } from '@models/league.entity';
import { isAfter, parseISO } from 'date-fns';
import { ParticipantService } from '@modules/participant/participant.service';
import { SubscriptionUpdateDTO } from './dto/subscription-update.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel('Subscription')
    private readonly _subscriptionModel: Model<Subscription>,
    private readonly _userService: UserService,
    private readonly _leagueService: LeagueService,
    private readonly _teamService: TeamService,
    private readonly _participantService: ParticipantService,
  ) {}

  async index(like: string, authUser: IUser): Promise<Subscription[]> {
    if (!like) {
      throw new BadRequestException('Informe como deseja receber a resposta');
    }

    const user = await this._userService.findByNickname(authUser.nickname);

    if (like === 'player') {
      return await this.indexLikeAPlayer(user);
    }

    if (like === 'organizer') {
      return await this.indexLikeAOrganizer(user);
    }
  }

  async create(subscriptionDTO: SubscriptionCreateDTO, authUser: IUser) {
    const user = await this._userService.findByNickname(authUser.nickname);
    const league = await this._leagueService.findById(subscriptionDTO.leagueId);

    if (!league) {
      throw new BadRequestException('Liga não existe ou foi excluida');
    }

    if (league.user.userId === authUser.userId) {
      throw new UnauthorizedException(
        'Você não pode se inscrever na sua própia liga',
      );
    }

    if (isAfter(parseISO(String(league.leagueStart)), new Date())) {
      throw new BadRequestException('Esse campeonato já iniciou');
    }

    if (league.forTeams) {
      return await this.subscribeTeam(user, league);
    }

    return await this.subscribePlayer(user, league);
  }

  async update(subscriptionDTO: SubscriptionUpdateDTO, authUser: IUser) {
    const user = await this._userService.findByNickname(authUser.nickname);
    const league = await this._leagueService.findById(subscriptionDTO.leagueId);

    if (!league) {
      throw new BadRequestException('Liga não encontrada');
    }

    if (league.user.userId !== user.userId) {
      throw new UnauthorizedException(
        'Somente o criador da liga pode atualiza-la',
      );
    }

    const subscription = await this._subscriptionModel
      .findById(subscriptionDTO._id)
      .exec();

    if (subscriptionDTO.accept) {
      const participants = await this._participantService.findOrCreate(
        authUser,
        {
          leagueId: league.leagueId,
          isTeams: league.forTeams,
        },
      );

      if (participants.numberOfParticipants >= league.maxParticipants) {
        throw new BadRequestException(
          'Numero máximo de participantes na liga foi alcançado',
        );
      }

      let participant = null;

      if (league.forTeams) {
        participant = await this._teamService.findById(subscription.teamId);
      }

      if (!league.forTeams) {
        participant = await this._userService.findByNickname(
          subscription.player.nickname,
        );
      }

      if (!participant) {
        await this._subscriptionModel.deleteOne({ _id: subscription._id });

        throw new BadRequestException(
          'O participante referente a essa inscrição não existe mais',
        );
      }

      participants.participants = [...participants.participants, participant];
      participants.numberOfParticipants += 1;
      await participants.save();
      subscription.status = true;
      await subscription.save();

      const list = await this.indexLikeAOrganizer(user);
      return { message: 'Inscrição aceita com sucesso!', list };
    }

    subscription.status = false;
    await subscription.save();

    const list = await this.indexLikeAOrganizer(user);
    return { message: 'Inscrição recusada com sucesso!', list };
  }

  private async indexLikeAPlayer(player: UserEntity): Promise<Subscription[]> {
    if (player.team) {
      return await this._subscriptionModel
        .find({
          $or: [{ playerId: player.userId }, { teamId: player.team.teamId }],
        })
        .sort({ createdAt: 'DESC' })
        .exec();
    }

    return await this._subscriptionModel
      .find({ playerId: player.userId })
      .sort({ createdAt: 'DESC' })
      .exec();
  }

  private async indexLikeAOrganizer(organizator: UserEntity) {
    return await this._subscriptionModel
      .find({
        organizerId: organizator.userId,
        status: null,
      })
      .sort({ createdAt: 'DESC' })
      .exec();
  }

  async subscribeTeam(
    player: UserEntity,
    league: LeagueEntity,
  ): Promise<Subscription[]> {
    if (!player.team) {
      throw new UnauthorizedException(
        'Esse campeonato é para times, crie um time ou entre em um para participar',
      );
    }

    const team = await this._teamService.findById(player.team.teamId);

    if (team.boss.userId !== player.userId) {
      throw new UnauthorizedException(
        'Somente o lider do time pode inscrever o time no campeonato',
      );
    }

    if (
      await this._subscriptionModel.findOne({
        teamId: team.teamId,
        leagueId: league.leagueId,
      })
    ) {
      throw new UnauthorizedException(
        'Seu time já possui inscrição neste campeonato',
      );
    }

    if (team.members.length < 3) {
      throw new BadRequestException(
        'Seu time precisa ter no minimo 3 integrates para inscrever em campeonatos',
      );
    }

    const newSubscription = new this._subscriptionModel({
      team,
      league,
      teamId: team.teamId,
      leagueId: league.leagueId,
      organizerId: league.user.userId,
    });

    await newSubscription.save();

    return await this.indexLikeAPlayer(player);
  }

  async subscribePlayer(player: UserEntity, league: LeagueEntity) {
    if (
      await this._subscriptionModel.findOne({
        playerId: player.userId,
        leagueId: league.leagueId,
      })
    ) {
      throw new UnauthorizedException(
        'Você já possui inscrição neste campeonato',
      );
    }

    const newSubscription = new this._subscriptionModel({
      player,
      league,
      playerId: player.userId,
      leagueId: league.leagueId,
      organizerId: league.user.userId,
    });

    await newSubscription.save();

    return await this.indexLikeAPlayer(player);
  }
}
