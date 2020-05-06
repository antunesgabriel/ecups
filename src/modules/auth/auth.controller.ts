import {
  Controller,
  UseGuards,
  Post,
  Request,
  ValidationPipe,
  UsePipes,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('local'))
  async player(@Request() req, @Req() login: LoginDTO): Promise<any> {
    return await this._authService.loginUser(req.user);
  }
}
