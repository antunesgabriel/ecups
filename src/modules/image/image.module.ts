import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerRepository } from '@modules/player/player.repository';
import { MemberRepository } from '@modules/member/member.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerRepository, MemberRepository])],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
