import {
  Controller,
  UseGuards,
  Res,
  Post,
  HttpStatus,
  Body,
  UsePipes,
  ValidationPipe,
  Put,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Response } from 'express';

import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { Roles } from '@decorators/roles.decorator';
import { User } from '@decorators/user.decorator';
import { IPlayer } from '@utils/player.interface';
import { TeamCreateDTO } from './dto/team-create.dto';
import { TeamService } from './team.service';
import { TeamUpdateDTO } from './dto/team-update.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerStorage, imageFileFilter } from 'src/configs/multerConfigs';

@Controller('team')
export class TeamController {
  constructor(private readonly _teamService: TeamService) {}

  @Post()
  @UseGuards(JwtAuthGuard, UseGuards)
  @Roles('PLAYER')
  @UsePipes(ValidationPipe)
  async store(
    @Res() res: Response,
    @User() player: IPlayer,
    @Body() team: TeamCreateDTO,
  ): Promise<Response> {
    const message = await this._teamService.create(team, player);
    return res.status(HttpStatus.CREATED).json(message);
  }

  @Put(':teamId')
  @UseGuards(JwtAuthGuard, UseGuards)
  @Roles('PLAYER')
  @UsePipes(ValidationPipe)
  async update(
    @Res() res: Response,
    @User() player: IPlayer,
    @Body() teamUpdate: TeamUpdateDTO,
    @Param('teamId') teamId: number,
  ): Promise<Response> {
    const message = await this._teamService.update(teamId, teamUpdate, player);
    return res.status(HttpStatus.OK).json(message);
  }

  @Delete(':teamId')
  @UseGuards(JwtAuthGuard, UseGuards)
  @Roles('PLAYER')
  async destroy(
    @Res() res: Response,
    @User() player: IPlayer,
    @Param('teamId') teamId: number,
  ): Promise<Response> {
    const message = await this._teamService.destroy(teamId, player);
    return res.status(HttpStatus.OK).json(message);
  }

  @Put(':teamId/shield')
  @UseGuards(JwtAuthGuard, UseGuards)
  @Roles('PLAYER')
  @UseInterceptors(
    FileInterceptor('shield', {
      storage: multerStorage,
      fileFilter: imageFileFilter,
    }),
  )
  async updateShield(
    @UploadedFile() file,
    @Res() res: Response,
    @User() player: IPlayer,
    @Param('teamId') teamId: number,
  ): Promise<Response> {
    const message = await this._teamService.updateShieldTeam(
      teamId,
      file.filename,
      player,
    );
    return res.status(HttpStatus.OK).json(message);
  }
}
