import { Controller, Get, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { UserGuard } from '@guards/user.guard';
import { Roles } from '@decorators/roles.decorator';
import { User } from '@decorators/user.decorator';
import { IUser } from '@utils/user.interface';
import { PlayerHomeService } from './player-home.service';

@Controller('player-home')
export class PlayerHomeController {
  constructor(private readonly _playerHomeService: PlayerHomeService) {}
  @Get()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('PLAYER')
  async index(
    @Res() res: Response,
    @User() authUser: IUser,
  ): Promise<Response> {
    const result = await this._playerHomeService.show(authUser);
    return res.status(HttpStatus.OK).json(result);
  }
}
