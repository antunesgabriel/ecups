import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Participant } from './participant.model';
import { LeagueService } from '@modules/league/league.service';
import { ParticipantCreateDTO } from './dto/paticipant-create.dto';
import { IUser } from '@utils/user.interface';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectModel('Participant')
    private readonly _participantModel: Model<Participant>,
    private readonly _leagueService: LeagueService,
  ) {}

  async create(
    participantDTO: ParticipantCreateDTO,
    authUser: IUser,
  ): Promise<Participant> {
    const league = await this._leagueService.findById(
      participantDTO.leagueId,
      authUser.userId,
    );

    if (!league) {
      throw new BadRequestException('Essa liga não existe');
    }

    const participant = new this._participantModel({
      ...participantDTO,
      creatorId: authUser.userId,
    });

    return await participant.save();
  }

  async update() {
    return true;
  }

  async find(creatorId: number, leagueId: number): Promise<Participant | null> {
    return await this._participantModel.findOne({ creatorId, leagueId });
  }

  async findOrCreate(
    authUser: IUser,
    participantDTO: ParticipantCreateDTO,
  ): Promise<Participant> {
    let participants = await this.find(
      authUser.userId,
      participantDTO.leagueId,
    );

    if (!participants) {
      participants = await this.create(participantDTO, authUser);
    }

    return participants;
  }
}
