import { Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerRepository } from './player.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PlayerRepository])],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
