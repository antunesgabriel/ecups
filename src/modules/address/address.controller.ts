import {
  Controller,
  Body,
  Res,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';

import { AddressService } from './address.service';
import { AddressDTO } from './dto/address.dto';
import { User } from '@decorators/user.decorator';
import { IUser } from '@utils/user.interface';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { UserGuard } from '@guards/user.guard';
import { Roles } from '@decorators/roles.decorator';

@Controller('address')
export class AddressController {
  constructor(private readonly _addressService: AddressService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('PLAYER', 'ADMIN')
  async store(
    @Body() address: AddressDTO,
    @Res() res: Response,
    @User() user: IUser,
  ): Promise<Response> {
    const result = await this._addressService.save(user, address);
    return res.status(HttpStatus.OK).json(result);
  }
}
