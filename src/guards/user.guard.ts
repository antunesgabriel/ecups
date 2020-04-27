import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const roles = this._reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const userRole = user.isPlayer ? 'PLAYER' : 'MEMBER';

    if (roles.some(role => role === userRole)) {
      return true;
    }

    throw new UnauthorizedException(
      'Vocề não possui permissão para acessar esta rota',
    );
  }
}
