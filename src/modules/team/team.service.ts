import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamRepository } from './team.repository';
import { UserService } from '@modules/user/user.service';
import { TeamDTO } from './dto/team.dto';
import { IUser } from '@utils/user.interface';
import { UserEntity } from '@models/user.entity';
import { IFeedback } from '@interfaces/feedback.interface';
import {
  Pagination,
  IPaginationOptions,
  paginate,
} from 'nestjs-typeorm-paginate';
import { TeamEntity } from '@models/team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamRepository)
    private readonly _teamRepository: TeamRepository,
    private readonly _userService: UserService,
  ) {}

  async index(options: IPaginationOptions): Promise<Pagination<TeamEntity>> {
    const query = this._teamRepository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.members', 'members')
      .orderBy('team.teamId', 'ASC');

    return paginate<TeamEntity>(query, options);
  }

  async create(teamDTO: TeamDTO, authUser: IUser): Promise<any> {
    teamDTO.team = teamDTO.team.trim();
    const user = await this._userService.findByNickname(authUser.nickname);

    if (await this._teamRepository.findOne({ team: teamDTO.team })) {
      throw new BadRequestException('Ja existe um time com este nome');
    }
    const newTeam = this._teamRepository.create(teamDTO);
    newTeam.boss = user;

    const team = await this._teamRepository.save(newTeam);

    return { message: 'Time criado com sucesso', team };
  }

  async update(
    teamId: number,
    teamDTO: TeamDTO,
    authUser: IUser,
  ): Promise<any> {
    teamDTO.team = teamDTO.team.trim();
    const team = await this._teamRepository.findOne({ teamId });
    const user = await this._userService.findByNickname(authUser.nickname);

    if (!team) {
      throw new NotFoundException('Time não encotrado');
    }

    if (!(await this.isBoss(teamId, user))) {
      throw new BadRequestException(
        'Somente o lider do time pode fazer alterações',
      );
    }

    if (
      teamDTO.team !== team.team &&
      (await this._teamRepository.findOne({ team: teamDTO.team }))
    ) {
      throw new BadRequestException('Ja existe um time com este nome');
    }

    team.team = teamDTO.team;

    const reloaded = await this._teamRepository.save(team);

    return { message: 'Time atualizado', team: reloaded };
  }

  async destroy(teamId: number, authUser: IUser): Promise<IFeedback> {
    const team = await this._teamRepository.findOne({ teamId });

    if (!team) {
      throw new NotFoundException('Time não encotrado');
    }

    const user = await this._userService.findByNickname(authUser.nickname);

    if (!(await this.isBoss(teamId, user))) {
      throw new BadRequestException(
        'Somente o lider do time pode excluir o time',
      );
    }

    await this._teamRepository.softDelete(team);

    return { message: 'time excluido' };
  }

  async updateShield(
    teamId: number,
    filename: string,
    authUser: IUser,
  ): Promise<any> {
    const team = await this._teamRepository.findOne({ teamId });

    if (!team) {
      throw new NotFoundException('Time não encotrado');
    }

    const user = await this._userService.findByNickname(authUser.nickname);

    if (!(await this.isBoss(teamId, user))) {
      throw new BadRequestException(
        'Somente o lider do time pode alterar o escudo',
      );
    }

    team.shield = filename;

    const reloaded = await this._teamRepository.save(team);

    return { message: 'Escudo atualizado', team: reloaded };
  }

  async myTeam(authUser: IUser): Promise<TeamEntity | null> {
    const user = await this._userService.findByNickname(authUser.nickname);

    const team = await this._teamRepository.findOne({
      where: [{ boss: user }, { members: [user] }],
    });

    return team;
  }

  private async isBoss(teamId: number, user: UserEntity): Promise<boolean> {
    return !!(await this._teamRepository.findOne({
      where: { teamId, boss: user },
    }));
  }
}
