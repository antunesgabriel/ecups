import {
  Controller,
  Get,
  Res,
  Post,
  HttpStatus,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';

import { PlayerCreateDTO } from './dto/player-create.dto';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly _playerSevice: PlayerService) {}

  @Get()
  async index(@Res() res: Response): Promise<Response> {
    return res.status(200).send();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async store(
    @Body() player: PlayerCreateDTO,
    @Res() res: Response,
  ): Promise<Response> {
    const saved = await this._playerSevice.create(player);
    return res.status(HttpStatus.CREATED).json({ player: saved });
  }
}
