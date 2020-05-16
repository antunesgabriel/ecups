import {
  Controller,
  Get,
  UseGuards,
  Res,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { UserGuard } from '@guards/user.guard';
import { Roles } from '@decorators/roles.decorator';

import { NotificationService } from './notification.service';
import { User } from '@decorators/user.decorator';
import { IUser } from '@utils/user.interface';

@Controller('notification')
export class NotificationController {
  constructor(private readonly _notificationService: NotificationService) {}

  @Get()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('ADMIN', 'PLAYER')
  async index(@Res() res: Response, @User() user: IUser): Promise<Response> {
    const notifications = await this._notificationService.index(user);
    return res.status(HttpStatus.CREATED).json({ notifications });
  }

  @Put()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('ADMIN', 'PLAYER')
  async update(@Res() res: Response, @User() user: IUser): Promise<Response> {
    await this._notificationService.update(user);
    return res.status(HttpStatus.OK).send();
  }
}
