import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerRepository } from '@modules/player/player.repository';
import { MemberModule } from '@modules/member/member.module';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerRepository]), MemberModule],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
