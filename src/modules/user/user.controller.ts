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

import { UserService } from './user.service';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { UserGuard } from '@guards/user.guard';
import { Roles } from '@decorators/roles.decorator';
import { UserCreateDTO } from './dto/user-create.dto';
import { UserUpdateDTO } from './dto/user-update.dto';
import { User } from '@decorators/user.decorator';
import { IUser } from '@utils/user.interface';

const URL = process.env.APP_URL;

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('ADMIN')
  async index(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Res() res: Response,
  ): Promise<Response> {
    limit = limit > 30 ? 30 : limit;

    const paginate = await this._userService.index({
      limit,
      page,
      route: `${URL}/user`,
    });

    return res.status(HttpStatus.OK).json(paginate);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async store(
    @Body() userCreateDTO: UserCreateDTO,
    @Res() res: Response,
  ): Promise<Response> {
    const feedback = await this._userService.create(userCreateDTO);
    return res.status(HttpStatus.CREATED).json(feedback);
  }

  @Put(':userId')
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('ADMIN', 'PLAYER')
  @UsePipes(ValidationPipe)
  async update(
    @Param('userId') userId: number,
    @Body() userUpdateDTO: UserUpdateDTO,
    @Res() res: Response,
    @User() user: IUser,
  ): Promise<Response> {
    const feedback = await this._userService.update(
      userId,
      userUpdateDTO,
      user,
    );
    return res.status(HttpStatus.OK).json(feedback);
  }

  @Delete(':userId')
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('ADMIN')
  async destoy(
    @Param('userId') userId: number,
    @Res() res: Response,
  ): Promise<Response> {
    const feedback = await this._userService.destroy(userId);
    return res.status(HttpStatus.OK).json(feedback);
  }
}
