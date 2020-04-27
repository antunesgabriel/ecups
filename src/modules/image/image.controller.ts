import {
  Controller,
  Post,
  Res,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Query,
  BadRequestException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Response } from 'express';

import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerStorage, imageFileFilter } from 'src/configs/multerConfigs';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { UserGuard } from '@guards/user.guard';
import { Roles } from '@decorators/roles.decorator';

@Controller('image')
export class ImageController {
  constructor(private readonly _imageService: ImageService) {}

  @Post()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('MEMBER', 'PLAYER')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multerStorage,
      fileFilter: imageFileFilter,
    }),
  )
  async store(
    @UploadedFile() file,
    @Query('to') to: string,
    @Res() res: Response,
    @Request() req,
  ): Promise<Response> {
    const permitedTo = ['player', 'member'];

    if (!to || permitedTo.indexOf(to) === -1) {
      throw new BadRequestException('Destino da imagem inválido');
    }

    const message = await this._imageService.save(to, file.filename, req.user);

    return res.status(HttpStatus.CREATED).json(message);
  }
}
