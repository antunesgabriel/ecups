import {
  Controller,
  Query,
  Res,
  HttpStatus,
  Get,
  UseGuards,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Put,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { UserGuard } from '@guards/user.guard';
import { Roles } from '@decorators/roles.decorator';
import { LeagueService } from './league.service';
import { User } from '@decorators/user.decorator';
import { IUser } from '@utils/user.interface';
import { LeagueCreateDTO } from './dto/league-create.dto';
import { LeagueUpdateDTO } from './dto/league-update.dto';

const URL = process.env.APP_URL;

@Controller('league')
export class LeagueController {
  constructor(private readonly _leagueService: LeagueService) {}

  @Get()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('ADMIN', 'PLAYER')
  async index(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Res() res: Response,
    @User() user: IUser,
  ): Promise<Response> {
    limit = +limit > 30 ? 30 : limit;
    page = +page ? page : 1;

    const paginate = await this._leagueService.index(
      {
        limit,
        page,
        route: `${URL}/league`,
      },
      user,
    );

    return res.status(HttpStatus.OK).json(paginate);
  }

  @Post()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('ADMIN', 'PLAYER')
  @UsePipes(ValidationPipe)
  async store(
    @Body() leagueCreateDTO: LeagueCreateDTO,
    @Res() res: Response,
    @User() user: IUser,
  ): Promise<Response> {
    const feedback = await this._leagueService.create(leagueCreateDTO, user);
    return res.status(HttpStatus.CREATED).json(feedback);
  }

  @Put(':leagueId')
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('ADMIN', 'PLAYER')
  @UsePipes(ValidationPipe)
  async update(
    @Body() leagueUpdateDTO: LeagueUpdateDTO,
    @Res() res: Response,
    @User() user: IUser,
    @Param('leagueId') leagueId: number,
  ): Promise<Response> {
    const feedback = await this._leagueService.update(
      leagueId,
      leagueUpdateDTO,
      user,
    );
    return res.status(HttpStatus.OK).json(feedback);
  }

  @Delete(':leagueId')
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('ADMIN', 'PLAYER')
  async destroy(
    @Res() res: Response,
    @User() user: IUser,
    @Param('leagueId') leagueId: number,
  ): Promise<Response> {
    const feedback = await this._leagueService.destroy(leagueId, user);
    return res.status(HttpStatus.OK).json(feedback);
  }

  @Get('show/:leagueId')
  async show(
    @Param('leagueId') leagueId: number,
    @Res() res: Response,
  ): Promise<Response> {
    if (!Number(leagueId)) {
      throw new BadRequestException('Tipo de dado invalido');
    }
    const league = await this._leagueService.show(leagueId);
    return res.status(HttpStatus.OK).json({ league });
  }

  @Get('all')
  async all(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('leagueId') leagueId: number | undefined,
    @Res() res: Response,
  ): Promise<Response> {
    limit = +limit > 30 ? 30 : limit;
    page = +page ? page : 1;

    if (leagueId) {
      if (!Number.isInteger(+leagueId) || !+leagueId) {
        throw new BadRequestException('Identificador de liga invalido');
      }

      leagueId = +leagueId;
    }

    const paginate = await this._leagueService.all(
      {
        limit,
        page,
        route: `${URL}/league/all`,
      },
      leagueId,
    );

    return res.status(HttpStatus.OK).json(paginate);
  }
}
