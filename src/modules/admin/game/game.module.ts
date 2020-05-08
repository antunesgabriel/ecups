import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameRepository } from './game.repository';

@Module({
  providers: [GameService],
  controllers: [GameController],
  imports: [TypeOrmModule.forFeature([GameRepository])],
  exports: [GameService],
})
export class GameModule {}
