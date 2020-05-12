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
} from '@nestjs/common';
import { Response } from 'express';

import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { UserGuard } from '@guards/user.guard';
import { Roles } from '@decorators/roles.decorator';
import { LeagueTypeService } from './league-type.service';
import { LeagueTypeDTO } from './dto/league-type.dto';

const URL = process.env.APP_URL;

@Controller('league-type')
export class LeagueTypeController {
  constructor(private readonly _leagueTypeService: LeagueTypeService) {}

  @Get()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('ADMIN')
  async index(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Res() res: Response,
  ): Promise<Response> {
    limit = +limit > 30 ? 30 : limit;
    page = +page ? page : 1;

    const paginate = await this._leagueTypeService.index({
      limit,
      page,
      route: `${URL}/league-type`,
    });

    return res.status(HttpStatus.OK).json(paginate);
  }

  @Post()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('ADMIN')
  @UsePipes(ValidationPipe)
  async store(
    @Body() leagueTypeDTO: LeagueTypeDTO,
    @Res() res: Response,
  ): Promise<Response> {
    const feedback = await this._leagueTypeService.create(leagueTypeDTO);
    return res.status(HttpStatus.CREATED).json(feedback);
  }

  @Put(':leagueTypeId')
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('ADMIN')
  @UsePipes(ValidationPipe)
  async update(
    @Param('leagueTypeId') leagueTypeId: number,
    @Body() leagueTypeDTO: LeagueTypeDTO,
    @Res() res: Response,
  ): Promise<Response> {
    const feedback = await this._leagueTypeService.update(
      leagueTypeId,
      leagueTypeDTO,
    );
    return res.status(HttpStatus.OK).json(feedback);
  }

  @Delete(':leagueTypeId')
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('ADMIN')
  async destoy(
    @Param('leagueTypeId') leagueTypeId: number,
    @Res() res: Response,
  ): Promise<Response> {
    const feedback = await this._leagueTypeService.destroy(leagueTypeId);
    return res.status(HttpStatus.OK).json(feedback);
  }

  @Get('all')
  async all(@Res() res: Response): Promise<Response> {
    const list = await this._leagueTypeService.all();
    return res.status(HttpStatus.OK).json(list);
  }
}
