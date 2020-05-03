import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterTeamRepository } from './register-team.repository';
import { OrganizationRepository } from '@modules/organization/organization.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationPlayer } from '@shared/notification-player.model';

@Injectable()
export class RegisterTeamService {
  constructor(
    @InjectRepository(RegisterTeamRepository)
    private readonly _registerTeamRepository: RegisterTeamRepository,
    @InjectRepository(OrganizationRepository)
    private readonly _organizationRepository: OrganizationRepository,
    @InjectModel('NotificationPlayer')
    private readonly _notificationPlayerModel: Model<NotificationPlayer>,
  ) {}
}
