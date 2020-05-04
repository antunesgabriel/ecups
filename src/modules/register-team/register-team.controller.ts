import {
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Res,
  Body,
  HttpStatus,
  Put,
  Param,
  Query,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { RegisterPlayerService } from '@modules/register-player/register-player.service';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { UserGuard } from '@guards/user.guard';
import { Roles } from '@decorators/roles.decorator';
import { User } from '@decorators/user.decorator';
import { IPlayer } from '@utils/player.interface';
import { RegisterTeamCreateDTO } from './dto/register-team-create.dto';
import { IMember } from '@utils/member.interface';
import { RegisterUpdateDTO } from '@shared/register-update.dto';

@Controller('register-team')
export class RegisterTeamController {
  constructor(private readonly _registerTeamService: RegisterPlayerService) {}

  @Get()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('MEMBER', 'PLAYER')
  async index(
    @User() user,
    @Res() res: Response,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('championshipId') championshipId = 0,
  ): Promise<Response> {
    limit = limit > 20 ? 20 : limit;
    const paginateOptions = {
      limit,
      page,
      route: 'register-team',
    };

    const list = await this._registerTeamService.paginate(
      paginateOptions,
      user,
      championshipId,
    );

    return res.status(HttpStatus.OK).json({ ...list });
  }

  @Post()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('PLAYER')
  @UsePipes(ValidationPipe)
  async store(
    @Res() res: Response,
    @User() player: IPlayer,
    @Body() registration: RegisterTeamCreateDTO,
  ): Promise<Response> {
    const message = await this._registerTeamService.store(registration, player);

    return res.status(HttpStatus.CREATED).json(message);
  }

  @Put(':registrationId')
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('Member')
  @UsePipes(ValidationPipe)
  async update(
    @Res() res: Response,
    @User() member: IMember,
    @Body() registerUpdate: RegisterUpdateDTO,
    @Param('registrationId') registrationId: number,
  ): Promise<Response> {
    const message = await this._registerTeamService.update(
      registerUpdate,
      member,
      registrationId,
    );
    return res.status(HttpStatus.OK).json(message);
  }
}
