import { Controller, UseGuards, Post, Request, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post()
  async player(@Request() req, @Query('to') to: string): Promise<any> {
    if (to === 'player') {
      return this._authService.loginPlayer(req.user);
    }
  }
}
