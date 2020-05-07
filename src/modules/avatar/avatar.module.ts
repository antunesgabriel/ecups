import { Module } from '@nestjs/common';
import { AvatarController } from './avatar.controller';
import { UserModule } from '@modules/user/user.module';

@Module({
  controllers: [AvatarController],
  imports: [UserModule],
})
export class AvatarModule {}
