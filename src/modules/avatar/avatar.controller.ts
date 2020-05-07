import {
  Controller,
  UseInterceptors,
  UploadedFile,
  Post,
  UseGuards,
  Res,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

import { UserService } from '@modules/user/user.service';

import { multerStorage, imageFileFilter } from 'src/configs/multerConfigs';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { UserGuard } from '@guards/user.guard';
import { Roles } from '@decorators/roles.decorator';
import { User } from '@decorators/user.decorator';
import { IUser } from '@utils/user.interface';

@Controller('avatar')
export class AvatarController {
  constructor(private readonly _userService: UserService) {}

  @Post()
  @UseGuards(JwtAuthGuard, UserGuard)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: multerStorage,
      fileFilter: imageFileFilter,
    }),
  )
  async store(
    @UploadedFile() file,
    @Res() res: Response,
    @User() user: IUser,
  ): Promise<Response> {
    if (!file) {
      throw new BadRequestException('Por favor selecione uma foto para upload');
    }
    const filename = await this._userService.updateAvatar(file.filename, user);
    return res.status(HttpStatus.OK).json({ filename });
  }
}
