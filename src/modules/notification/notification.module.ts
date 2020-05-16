import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from '@schemas/notification.schema';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService],
  imports: [
    MongooseModule.forFeature([
      { name: 'Notification', schema: NotificationSchema },
    ]),
  ],
  exports: [NotificationService],
})
export class NotificationModule {}
