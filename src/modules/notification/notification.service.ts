import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './notification.model';
import { IUser } from '@utils/user.interface';
import { NotificationCreateDTO } from './dto/notification-create.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel('Notification')
    private readonly _notificationModel: Model<Notification>,
  ) {}

  async index(authUser: IUser): Promise<Notification[]> {
    const notifications = await this._notificationModel
      .find({
        userId: authUser.userId,
        read: false,
      })
      .exec();

    return notifications;
  }

  async create(notificationDTO: NotificationCreateDTO): Promise<any> {
    const notification = new this._notificationModel(notificationDTO);
    await notification.save();
    return { message: 'Notificação criada com sucesso!' };
  }

  async update(authUser: IUser): Promise<void> {
    await this._notificationModel
      .updateMany({ userId: authUser.userId }, { read: true })
      .exec();
  }
}
