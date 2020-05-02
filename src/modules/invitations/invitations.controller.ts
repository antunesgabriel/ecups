import {
  Controller,
  Get,
  UseGuards,
  HttpStatus,
  Res,
  Query,
} from '@nestjs/common';
import { Response } from 'express';

import { InvitationsService } from './invitations.service';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { UserGuard } from '@guards/user.guard';
import { Roles } from '@decorators/roles.decorator';
import { User } from '@decorators/user.decorator';
import { IPlayer } from '@utils/player.interface';

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
}
