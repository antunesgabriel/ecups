import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';

import { AdminService } from './admin.service';
import { AdminCreateDTO } from './dto/admin-create.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly _adminService: AdminService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async store(
    @Body() adminCreateDTO: AdminCreateDTO,
    @Res() res: Response,
  ): Promise<Response> {
    const admin = await this._adminService.create(adminCreateDTO);
    return res.status(HttpStatus.CREATED).json(admin);
  }
}
