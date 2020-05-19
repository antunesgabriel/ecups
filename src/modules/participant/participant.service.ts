import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Participant } from './participant.model';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectModel('Participant')
    private readonly _participantModel: Model<Participant>,
  ) {}

  async create() {
    return true;
  }

  async update() {
    return true;
  }

  async find() {
    return true;
  }
}
