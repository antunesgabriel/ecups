import { Controller, UseGuards, Post, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post()
  async player(@Request() req): Promise<any> {
    return await this._authService.loginUser(req.user);
  }
}
