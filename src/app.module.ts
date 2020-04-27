import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { Connection } from 'typeorm';

// Local
import { multerStorage } from './configs/multerConfigs';
import TypeOrmModuleConfig from './configs/TypeOrmModuleConfig';

@Module({
  imports: [
    TypeOrmModuleConfig,
    MulterModule.register({ storage: multerStorage }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
