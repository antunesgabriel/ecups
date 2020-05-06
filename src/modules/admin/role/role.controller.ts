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

import { RoleService } from './role.service';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { UserGuard } from '@guards/user.guard';
import { Roles } from '@decorators/roles.decorator';
import { RoleCreateDTO } from './dto/role-create.dto';
import { RoleUpdateDTO } from './dto/role-update.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @Get()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('ADMIN')
  async index(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Res() res: Response,
  ): Promise<Response> {
    limit = limit > 30 ? 30 : limit;

    const paginate = await this._roleService.index({
      limit,
      page,
      route: `${URL}/role`,
    });

    return res.status(HttpStatus.OK).json(paginate);
  }

  @Post()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('ADMIN')
  @UsePipes(ValidationPipe)
  async store(
    @Body() roleCreateDTO: RoleCreateDTO,
    @Res() res: Response,
  ): Promise<Response> {
    const feedback = await this._roleService.create(roleCreateDTO);
    return res.status(HttpStatus.CREATED).json(feedback);
  }

  @Put(':roleId')
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('ADMIN')
  @UsePipes(ValidationPipe)
  async update(
    @Param('roleId') roleId: number,
    @Body() roleUpdateDTO: RoleUpdateDTO,
    @Res() res: Response,
  ): Promise<Response> {
    const feedback = await this._roleService.update(roleId, roleUpdateDTO);
    return res.status(HttpStatus.OK).json(feedback);
  }

  @Delete(':roleId')
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('ADMIN')
  async destoy(
    @Param('roleId') roleId: number,
    @Res() res: Response,
  ): Promise<Response> {
    const feedback = await this._roleService.destroy(roleId);
    return res.status(HttpStatus.OK).json(feedback);
  }
}
