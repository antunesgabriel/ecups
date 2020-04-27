import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { PlayerModule } from '@modules/player/player.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MemberModule } from '@modules/member/member.module';

const secret = process.env.APP_JWT_SECRET;
const expiresIn = process.env.APP_JWT_EXPIRE;

@Module({
  imports: [
    PlayerModule,
    MemberModule,
    PassportModule,
    JwtModule.register({ secret, signOptions: { expiresIn } }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
