import {
  Controller,
  Get,
  UseGuards,
  Res,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Put,
} from '@nestjs/common';
import { Response } from 'express';
import { InvitationService } from './invitation.service';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { UserGuard } from '@guards/user.guard';
import { Roles } from '@decorators/roles.decorator';
import { User } from '@decorators/user.decorator';
import { IUser } from '@utils/user.interface';
import { InvitationCreateDTO } from './dto/invitation-create.dto';
import { InvitationUpdateDTO } from './dto/invitation-update.dto';

@Controller('invitation')
export class InvitationController {
  constructor(private readonly _invitationService: InvitationService) {}

  @Get()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('PLAYER')
  async index(
    @Res() res: Response,
    @User() authUser: IUser,
  ): Promise<Response> {
    const invitations = await this._invitationService.index(authUser);
    return res.status(HttpStatus.OK).json({ invitations });
  }

  @Post()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('PLAYER')
  @UsePipes(ValidationPipe)
  async store(
    @Res() res: Response,
    @User() authUser: IUser,
    @Body() invitationDTO: InvitationCreateDTO,
  ): Promise<Response> {
    const feedback = await this._invitationService.create(
      invitationDTO,
      authUser,
    );
    return res.status(HttpStatus.CREATED).json(feedback);
  }

  @Put()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('PLAYER')
  @UsePipes(ValidationPipe)
  async update(
    @Body() invitationDTO: InvitationUpdateDTO,
    @User() authUser: IUser,
    @Res() res: Response,
  ): Promise<Response> {
    const feedback = await this._invitationService.update(
      invitationDTO,
      authUser,
    );
    return res.status(HttpStatus.OK).json(feedback);
  }
}
