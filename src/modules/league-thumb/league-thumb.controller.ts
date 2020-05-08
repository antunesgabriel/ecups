import {
  Controller,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Res,
  HttpStatus,
  BadRequestException,
  Put,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { LeagueService } from '@modules/league/league.service';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { UserGuard } from '@guards/user.guard';
import { Roles } from '@decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerStorage, imageFileFilter } from 'src/configs/multerConfigs';
import { User } from '@decorators/user.decorator';
import { IUser } from '@utils/user.interface';

@Controller('league-thumb')
export class LeagueThumbController {
  constructor(private readonly _leagueService: LeagueService) {}

  @Put(':leagueId')
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('ADMIN', 'PLAYER')
  @UseInterceptors(
    FileInterceptor('thumb', {
      storage: multerStorage,
      fileFilter: imageFileFilter,
    }),
  )
  async update(
    @UploadedFile() file,
    @Res() res: Response,
    @Param('leagueId') leagueId: number,
    @User() user: IUser,
  ): Promise<Response> {
    const feedback = await this._leagueService.updateThumb(
      leagueId,
      file.filename,
      user,
    );

    return res.status(HttpStatus.OK).json(feedback);
  }
}
