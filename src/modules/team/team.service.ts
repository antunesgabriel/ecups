import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamRepository } from './team.repository';
import { PlayerService } from '@modules/player/player.service';
import { TeamCreateDTO } from './dto/team-create.dto';
import { TeamUpdateDTO } from './dto/team-update.dto';
import { IPlayer } from '@utils/player.interface';
import { TeamEntity } from '@models/team.entity';
import { PlayerEntity } from '@models/player.entity';
import { classToPlain } from 'class-transformer';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamRepository)
    private readonly _teamRepository: TeamRepository,
    private readonly _playerService: PlayerService,
  ) {}

  async create(teamCreation: TeamCreateDTO, player: IPlayer): Promise<any> {
    const currentPlayer = await this._playerService.findByEmail(player.email);

    if (!currentPlayer) {
      throw new BadRequestException('Player invalido');
    }

    if (currentPlayer.leaderOf || currentPlayer.team) {
      const teamName = currentPlayer.leaderOf
        ? currentPlayer.leaderOf.name
        : currentPlayer.team.name;
      throw new UnauthorizedException(
        `Você não pode criar um novo time pois já participa do time: ${teamName}`,
      );
    }

    if (await this._teamRepository.findOne({ name: teamCreation.name })) {
      throw new BadRequestException('Já exite um time com este nome');
    }

    const team = this._teamRepository.create({
      ...teamCreation,
      leader: currentPlayer,
    });
    const newTeam = await this._teamRepository.save(team);

    return { message: 'Time criado com sucesso', team: classToPlain(newTeam) };
  }

  async update(
    teamId: number,
    teamUpdate: TeamUpdateDTO,
    player: IPlayer,
  ): Promise<any> {
    const currentPlayer = await this._playerService.findByEmail(player.email);

    if (!currentPlayer) {
      throw new BadRequestException('Player inválido');
    }

    const team = await this.findTeamById(teamId);

    await this.validateLeader(team, currentPlayer);

    if (
      teamUpdate.name !== team.name &&
      (await this._teamRepository.findOne({ name: teamUpdate.name }))
    ) {
      throw new BadRequestException('Já exite um time com este nome');
    }

    const result = await this._teamRepository.update({ teamId }, teamUpdate);

    if (!result.affected) {
      throw new BadRequestException(
        'Ocorreu um erro durante a atualização das informações do time. Tente novamente mais tarde',
      );
    }

    return { message: 'Time atualizado com sucesso' };
  }

  async destroy(teamId: number, player: IPlayer): Promise<any> {
    const currentPlayer = await this._playerService.findByEmail(player.email);

    if (!currentPlayer) {
      throw new BadRequestException('Player inválido');
    }

    const team = await this.findTeamById(teamId);

    await this.validateLeader(team, currentPlayer);

    const result = await this._teamRepository.delete({ teamId });

    if (!result.affected) {
      throw new BadRequestException(
        'Ouve um erro durante a exclusão do time. Entre em contato com o suporte',
      );
    }

    return { message: 'Time excluido com sucesso' };
  }

  async updateShieldTeam(
    teamId: number,
    path: string,
    player: IPlayer,
  ): Promise<any> {
    const currentPlayer = await this._playerService.findByEmail(player.email);

    if (!currentPlayer) {
      throw new BadRequestException('Player invalido');
    }

    const team = await this.findTeamById(teamId);

    await this.validateLeader(team, currentPlayer);

    const result = await this._teamRepository.update(
      { teamId },
      { shield: path },
    );

    if (!result.affected) {
      throw new BadRequestException(
        'Não foi possivel atualizar o escudo do time',
      );
    }

    return { message: 'Logo/Escudo do time atualizado com sucesso' };
  }

  async findTeamById(teamId: number): Promise<TeamEntity | null> {
    const team = await this._teamRepository.findOne({
      where: { teamId },
      relations: ['leader', 'members'],
    });

    // TODO: Excluir foto upada
    if (!team) {
      throw new BadRequestException('O time especificado não existe');
    }

    return team;
  }

  async validateLeader(
    team: TeamEntity,
    player: PlayerEntity,
  ): Promise<boolean> {
    if (team.leader.playerId !== player.playerId) {
      throw new UnauthorizedException(
        'Somente o lider pode alterar o as informações do time',
      );
    }

    return true;
  }
}
