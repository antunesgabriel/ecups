import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection as MongoseConnection } from 'mongoose';

// Local
import { multerStorage } from './configs/multerConfigs';
import TypeOrmModuleConfig from './configs/TypeOrmModuleConfig';
import MongooseConfig from './configs/MongooseConfig';

// Modules
import { AdminModule } from '@modules/admin/admin/admin.module';
import { AuthModule } from '@modules/auth/auth.module';
import { GameModule } from './modules/admin/game/game.module';
import { RoleModule } from './modules/admin/role/role.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModuleConfig,
    MongooseConfig,
    MulterModule.register({ storage: multerStorage }),
    AdminModule,
    AuthModule,
    GameModule,
    RoleModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    private connection: Connection,
    @InjectConnection() private mongooseConnection: MongoseConnection,
  ) {}
}
