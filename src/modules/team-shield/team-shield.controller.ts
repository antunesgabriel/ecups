import {
  Controller,
  Put,
  Param,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

import { TeamService } from '@modules/team/team.service';
import { User } from '@decorators/user.decorator';
import { IUser } from '@utils/user.interface';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { UserGuard } from '@guards/user.guard';
import { Roles } from '@decorators/roles.decorator';
import { multerStorage, imageFileFilter } from 'src/configs/multerConfigs';

@Controller('team-shield')
export class TeamShieldController {
  constructor(private readonly _teamService: TeamService) {}

  @Put(':teamId')
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('PLAYER')
  @UseInterceptors(
    FileInterceptor('shield', {
      storage: multerStorage,
      fileFilter: imageFileFilter,
    }),
  )
  async update(
    @UploadedFile() file,
    @Res() res: Response,
    @Param('teamId') teamId: number,
    @User() user: IUser,
  ): Promise<Response> {
    const feedback = await this._teamService.updateShield(
      teamId,
      file.filename,
      user,
    );

    return res.status(HttpStatus.OK).json(feedback);
  }
}
