import {
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Body,
  Res,
  HttpStatus,
  Put,
  Param,
  Delete,
  Get,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { Response } from 'express';
import { TeamService } from './team.service';
import { UserGuard } from '@guards/user.guard';
import { Roles } from '@decorators/roles.decorator';
import { TeamDTO } from './dto/team.dto';
import { User } from '@decorators/user.decorator';
import { IUser } from '@utils/user.interface';

const URL = process.env.APP_URL;

@Controller('team')
export class TeamController {
  constructor(private readonly _teamService: TeamService) {}

  @Get()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('ADMIN')
  async index(
    @Res() res: Response,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Response> {
    limit = +limit > 30 ? 30 : limit;
    page = +page ? page : 1;
    const list = await this._teamService.paginate({
      limit,
      page,
      route: `${URL}/team`,
    });
    return res.status(HttpStatus.OK).json(list);
  }

  @Post()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('PLAYER')
  @UsePipes(ValidationPipe)
  async store(
    @Body() teamDTO: TeamDTO,
    @Res() res: Response,
    @User() authUser: IUser,
  ): Promise<Response> {
    const feedback = await this._teamService.create(teamDTO, authUser);
    return res.status(HttpStatus.CREATED).json(feedback);
  }

  @Put(':teamId')
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('PLAYER')
  @UsePipes(ValidationPipe)
  async update(
    @Body() teamDTO: TeamDTO,
    @Res() res: Response,
    @User() authUser: IUser,
    @Param('teamId') teamId: number,
  ): Promise<Response> {
    const feedback = await this._teamService.update(teamId, teamDTO, authUser);
    return res.status(HttpStatus.OK).json(feedback);
  }

  @Delete(':teamId')
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('PLAYER', 'ADMIN')
  async destroy(
    @Res() res: Response,
    @User() authUser: IUser,
    @Param('teamId') teamId: number,
  ): Promise<Response> {
    const feedback = await this._teamService.destroy(teamId, authUser);
    return res.status(HttpStatus.OK).json(feedback);
  }

  @Get('show')
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('PLAYER')
  async show(@Res() res: Response, @User() authUser: IUser): Promise<Response> {
    const feedback = await this._teamService.show(authUser);
    return res.status(HttpStatus.OK).json(feedback);
  }
}
