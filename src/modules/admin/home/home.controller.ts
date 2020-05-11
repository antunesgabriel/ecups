import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import { LeagueService } from '@modules/league/league.service';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { UserGuard } from '@guards/user.guard';
import { Roles } from '@decorators/roles.decorator';

@Controller('admin/home')
export class HomeController {
  constructor(
    private readonly _userService: UserService,
    private readonly _leagueService: LeagueService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, UserGuard)
  @Roles('ADMIN')
  @Get()
  async index(): Promise<any> {
    const userInfo = await this._userService.info();
    const leagueInfo = await this._leagueService.info();

    return {
      userInfo,
      leagueInfo,
    };
  }
}
