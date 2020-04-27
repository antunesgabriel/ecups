import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, BadRequestException } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { classToPlain } from 'class-transformer';

import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private moduleRef: ModuleRef) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(request: any, email: string, password: string): Promise<any> {
    const { to } = request.query;
    const permitedTo = ['player'];

    if (!to || permitedTo.indexOf(to) === -1) {
      throw new BadRequestException('Destino da imagem inválido');
    }

    // Login para player
    if (to === 'player') {
      const player = await this.authService.validatePlayer(email, password);
      return classToPlain(player);
    }
  }
}
