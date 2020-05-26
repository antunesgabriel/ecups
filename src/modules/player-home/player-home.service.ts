import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LeagueRepository } from '@modules/league/league.repository';
import { ParticipantService } from '@modules/participant/participant.service';
import { IUser } from '@utils/user.interface';
import { UserService } from '@modules/user/user.service';

@Injectable()
export class PlayerHomeService {
  constructor(
    @InjectRepository(LeagueRepository)
    private readonly _leagueRepository: LeagueRepository,
    private readonly _participantService: ParticipantService,
    private readonly _userService: UserService,
  ) {}

  async show(authUser: IUser) {
    const user = await this._userService.findByNickname(authUser.nickname);

    const leaguesCount = await this._leagueRepository.count({
      where: { user },
      relations: ['user'],
    });

    const participations = await this._participantService.count(user);

    return { leaguesCount, participations };
  }
}
