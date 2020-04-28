import {
  Controller,
  Get,
  UseGuards,
  Res,
  HttpStatus,
  Query,
  Post,
  Body,
  Delete,
  Param,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';

import { ChampionshipService } from './championship.service';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { UserGuard } from '@guards/user.guard';
import { Roles } from '@decorators/roles.decorator';
import { User } from '@decorators/user.decorator';
import { IMember } from '@utils/member.interface';
import { ChampionshipCreateDTO } from './dto/championship-create.dto';

@Controller('championship')
export class ChampionshipController {
  constructor(private readonly _championshipService: ChampionshipService) {}

  @Get()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('MEMBER')
  async index(
    @Res() res: Response,
    @User() member: IMember,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<Response> {
    limit = limit > 20 ? 20 : limit;

    const list = await this._championshipService.paginate(
      { page, limit, route: '/championship' },
      member,
    );
    return res.status(HttpStatus.OK).json(list);
  }

  @Post()
  @UseGuards(JwtAuthGuard, UserGuard)
  @UsePipes(ValidationPipe)
  @Roles('MEMBER')
  async store(
    @Res() res: Response,
    @User() member: IMember,
    @Body() championship: ChampionshipCreateDTO,
  ): Promise<Response> {
    const message = await this._championshipService.create(
      championship,
      member,
    );
    return res.status(HttpStatus.OK).json(message);
  }

  @Delete(':championshipId')
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('MEMBER')
  async destrroy(
    @Res() res: Response,
    @User() member: IMember,
    @Param('championshipId') championshipId: number,
  ): Promise<Response> {
    const message = await this._championshipService.destroy(
      championshipId,
      member,
    );
    return res.status(HttpStatus.OK).json(message);
  }

  @Put(':championshipId')
  @UseGuards(JwtAuthGuard, UserGuard)
  @UsePipes(ValidationPipe)
  @Roles('MEMBER')
  async update(
    @Res() res: Response,
    @User() member: IMember,
    @Param('championshipId') championshipId: number,
    @Body() championship: ChampionshipCreateDTO,
  ): Promise<Response> {
    const message = await this._championshipService.update(
      championshipId,
      member,
      championship,
    );

    return res.status(HttpStatus.OK).json(message);
  }

  @Get('/all')
  async all(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Res() res: Response,
  ): Promise<Response> {
    limit = limit > 20 ? 20 : limit;

    const list = await this._championshipService.paginateAll({
      page,
      limit,
      route: '/championships',
    });
    return res.status(HttpStatus.OK).json(list);
  }
}
