import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { OrganizationCreateDTO } from './dto/organization-create.dto';
import { OrganizationService } from './organization.service';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { UserGuard } from '@guards/user.guard';
import { Roles } from '@decorators/roles.decorator';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly _organizationService: OrganizationService) {}

  @Post()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('MEMBER')
  @UsePipes(ValidationPipe)
  async store(
    @Body() organization: OrganizationCreateDTO,
    @Res() res: Response,
    @Req() req,
  ): Promise<Response> {
    const message = await this._organizationService.create(
      organization,
      req.user,
    );
    return res.status(HttpStatus.CREATED).json(message);
  }

  @Get(':nickname')
  async show(
    @Param('nickname') nickname: string,
    @Res() res: Response,
  ): Promise<Response> {
    const organization = await this._organizationService.show(nickname);

    return res.status(HttpStatus.OK).json({ organization });
  }
}
