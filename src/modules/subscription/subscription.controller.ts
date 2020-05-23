import {
  Controller,
  Res,
  Get,
  UseGuards,
  Query,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { Response } from 'express';
import { SubscriptionService } from './subscription.service';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { UserGuard } from '@guards/user.guard';
import { Roles } from '@decorators/roles.decorator';

import { User } from '@decorators/user.decorator';
import { IUser } from '@utils/user.interface';
import { SubscriptionCreateDTO } from './dto/subscription-create.dto';
import { SubscriptionUpdateDTO } from './dto/subscription-update.dto';
import { readSync } from 'fs';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly _subscriptionService: SubscriptionService) {}

  @Get()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('PLAYER', 'ADMIN')
  async index(
    @Res() res: Response,
    @Query('like') like: string,
    @User() authUser: IUser,
  ): Promise<Response> {
    const list = await this._subscriptionService.index(like, authUser);
    return res.status(HttpStatus.OK).json(list);
  }

  @Post()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('PLAYER', 'ADMIN')
  async store(
    @Res() res: Response,
    @User() authUser: IUser,
    subscriptionDTO: SubscriptionCreateDTO,
  ) {
    const subscriptions = await this._subscriptionService.create(
      subscriptionDTO,
      authUser,
    );

    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Inscrição realizada com sucesso', subscriptions });
  }

  @Put()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('PLAYER', 'ADMIN')
  async update(
    @Res() res: Response,
    @User() authUser: IUser,
    subscriptionDTO: SubscriptionUpdateDTO,
  ) {
    const response = await this._subscriptionService.update(
      subscriptionDTO,
      authUser,
    );

    return res.status(HttpStatus.OK).json(response);
  }
}
