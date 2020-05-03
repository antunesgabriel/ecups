import {
  Controller,
  Get,
  UseGuards,
  HttpStatus,
  Res,
  Query,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { Response } from 'express';

import { InvitationsService } from './invitations.service';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { UserGuard } from '@guards/user.guard';
import { Roles } from '@decorators/roles.decorator';
import { User } from '@decorators/user.decorator';
import { IPlayer } from '@utils/player.interface';
import { InvitationPlayerCreateDTO } from './dto/invitation-create.dto';
import { InvitationPlayerUpdateDTO } from './dto/invitation-update.dto';

@Controller('invitations')
export class InvitationsController {
  constructor(private readonly _invitationsService: InvitationsService) {}

  @Get()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('PLAYER')
  async index(
    @User() player: IPlayer,
    @Query('page') page = 0,
    @Query('limit') limit = 0,
    @Query('teamId') teamId = 0,
    @Res() res: Response,
  ): Promise<Response> {
    limit = limit > 20 ? 20 : limit;
    limit = limit * 1;
    const skip = (page - 1) * limit;

    const list = await this._invitationsService.paginate(
      {
        page,
        skip,
      },
      teamId,
      player,
    );
    return res.status(HttpStatus.OK).json(list);
  }

  @Post()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('PLAYER')
  @UsePipes(ValidationPipe)
  async store(
    @Body() invitation: InvitationPlayerCreateDTO,
    @User() player: IPlayer,
    @Res() res: Response,
  ): Promise<Response> {
    const message = await this._invitationsService.store(invitation, player);
    return res.status(HttpStatus.CREATED).json(message);
  }

  @Put()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('PLAYER')
  @UsePipes(ValidationPipe)
  async update(
    @Body() answer: InvitationPlayerUpdateDTO,
    @User() player: IPlayer,
    @Res() res: Response,
  ): Promise<Response> {
    const message = await this._invitationsService.update(answer, player);
    return res.status(HttpStatus.OK).json(message);
  }

  @Delete(':invitationId')
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('PLAYER')
  async destroy(
    @User() player: IPlayer,
    @Res() res: Response,
    @Param('invitationId') invitationId: string,
  ): Promise<Response> {
    const message = await this._invitationsService.destroy(
      invitationId,
      player,
    );
    return res.status(HttpStatus.OK).json(message);
  }
}
