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
  UseInterceptors,
  UploadedFile,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';

import { GameService } from './game.service';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { UserGuard } from '@guards/user.guard';
import { Roles } from '@decorators/roles.decorator';
import { GameCreateDTO } from './dto/game-create.dto';
import { GameUpdateDTO } from './dto/game-update.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerStorage, imageFileFilter } from 'src/configs/multerConfigs';

const URL = process.env.APP_URL;

@Controller('game')
export class GameController {
  constructor(private readonly _gameService: GameService) {}

  @Get()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('ADMIN')
  async index(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Res() res: Response,
  ): Promise<Response> {
    limit = limit > 30 ? 30 : limit;

    const paginate = await this._gameService.index({
      limit,
      page,
      route: `${URL}/game`,
    });

    return res.status(HttpStatus.OK).json(paginate);
  }

  @Post()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('ADMIN')
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: multerStorage,
      fileFilter: imageFileFilter,
    }),
  )
  async store(
    @Body() gameCreateDTO: GameCreateDTO,
    @UploadedFile() file,
    @Res() res: Response,
  ): Promise<Response> {
    gameCreateDTO.logo = file.filename;
    const feedback = await this._gameService.create(gameCreateDTO);
    return res.status(HttpStatus.CREATED).json(feedback);
  }

  @Put(':gameId')
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('ADMIN')
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: multerStorage,
      fileFilter: imageFileFilter,
    }),
  )
  async update(
    @Param('gameId') gameId: number,
    @Body() gameUpdateDTO: GameUpdateDTO,
    @UploadedFile() file,
    @Res() res: Response,
  ): Promise<Response> {
    if (file) {
      gameUpdateDTO.logo = file.filename;
    }
    const feedback = await this._gameService.update(gameId, gameUpdateDTO);
    return res.status(HttpStatus.OK).json(feedback);
  }

  @Delete(':gameId')
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('ADMIN')
  async destoy(
    @Param('gameId') gameId: number,
    @Res() res: Response,
  ): Promise<Response> {
    const feedback = await this._gameService.destroy(gameId);
    return res.status(HttpStatus.OK).json(feedback);
  }

  @Get('all')
  async all(@Res() res: Response): Promise<Response> {
    const list = await this._gameService.all();
    return res.status(HttpStatus.OK).json(list);
  }
}
