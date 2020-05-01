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
      throw new BadRequestException('Player invalido para criar um novo time');
    }

    if (currentPlayer.leaderOf || currentPlayer.team) {
      const teamName = currentPlayer.leaderOf
        ? currentPlayer.leaderOf.name
        : currentPlayer.team.name;
      throw new UnauthorizedException(
        `Você não pode criar um novo time pois já participa do time: ${teamName}`,
      );
    }

    const team = this._teamRepository.create(teamCreation);
    await this._teamRepository.save(team);

    return { message: 'Time criado com sucesso' };
  }

  async updateShieldTeam(
    teamId: number,
    path: string,
    player: IPlayer,
  ): Promise<any> {
    const currentPlayer = await this._playerService.findByEmail(player.email);

    if (!currentPlayer) {
      throw new BadRequestException('Player invalido para criar um novo time');
    }

    const team = await this._teamRepository.findOne({ teamId });

    // TODO: Excluir foto upada
    if (!team) {
      throw new BadRequestException('O time especificado não existe');
    }

    if (team.leader.playerId !== currentPlayer.playerId) {
      throw new UnauthorizedException(
        'Somente o lider pode alterar o escudo/logo do time',
      );
    }

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

  async update(
    teamId: number,
    teamUpdate: TeamUpdateDTO,
    player: IPlayer,
  ): Promise<any> {
    const currentPlayer = await this._playerService.findByEmail(player.email);

    if (!currentPlayer) {
      throw new BadRequestException('Player inválido para criar um novo time');
    }

    const team = await this._teamRepository.findOne({ teamId });

    // TODO: Excluir foto upada
    if (!team) {
      throw new BadRequestException('O time especificado não existe');
    }

    if (team.leader.playerId !== currentPlayer.playerId) {
      throw new UnauthorizedException(
        'Somente o lider pode alterar o as informações do time',
      );
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
      throw new BadRequestException('Player inválido para criar um novo time');
    }

    const team = await this._teamRepository.findOne({ teamId });

    // TODO: Excluir foto upada
    if (!team) {
      throw new BadRequestException('O time especificado não existe');
    }

    if (team.leader.playerId !== currentPlayer.playerId) {
      throw new UnauthorizedException(
        'Somente o lider pode alterar o as informações do time',
      );
    }

    const result = await this._teamRepository.delete({ teamId });

    if (!result.affected) {
      throw new BadRequestException(
        'Ouve um erro durante a exclusão do time. Entre em contato com o suporte',
      );
    }

    return { message: 'Time excluido com sucesso' };
  }
}
