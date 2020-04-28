import {
  Controller,
  Get,
  UseGuards,
  Res,
  HttpStatus,
  Query,
  Post,
  Body,
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
  @Roles('MEMBER')
  async store(
    @Res() res: Response,
    @User() member: IMember,
    @Body() championship: ChampionshipCreateDTO,
  ): Promise<Response> {
    const message = this._championshipService.create(championship, member);
    return res.status(HttpStatus.OK).json(message);
  }
}
