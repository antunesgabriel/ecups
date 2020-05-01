import {
  Controller,
  UseGuards,
  Get,
  Res,
  HttpStatus,
  Query,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { Response } from 'express';

import { RegisterPlayerService } from './register-player.service';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { UserGuard } from '@guards/user.guard';
import { Roles } from '@decorators/roles.decorator';
import { User } from '@decorators/user.decorator';
import { IMember } from '@utils/member.interface';
import { RegisterCreateDTO } from '@shared/register-create.dto';
import { IPlayer } from '@utils/player.interface';
import { RegisterUpdateDTO } from '@shared/register-update.dto';

@Controller('register-player')
export class RegisterPlayerController {
  constructor(private readonly _registerPlayerService: RegisterPlayerService) {}

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
      route: 'register-player',
    };

    const list = await this._registerPlayerService.paginate(
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
    @Body() register: RegisterCreateDTO,
    @Res() res: Response,
    @User() player: IPlayer,
  ): Promise<Response> {
    const message = await this._registerPlayerService.store(register, player);
    return res.status(HttpStatus.CREATED).json(message);
  }

  @Put(':idRegister')
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('MEMBER')
  @UsePipes(ValidationPipe)
  async update(
    @Body() updateRegister: RegisterUpdateDTO,
    @Res() res: Response,
    @Param('idRegister') idRegister: number,
    @User() member: IMember,
  ): Promise<Response> {
    const message = await this._registerPlayerService.update(
      updateRegister,
      member,
      idRegister,
    );
    return res.status(HttpStatus.OK).json(message);
  }

  @Delete(':idRegister')
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('MEMBER', 'PLAYER')
  async destroy(
    @Param('idRegister') idRegister: number,
    @User() user,
    @Res() res: Response,
  ): Promise<Response> {
    const message = await this._registerPlayerService.destroy(idRegister, user);
    return res.status(HttpStatus.OK).json(message);
  }
}
