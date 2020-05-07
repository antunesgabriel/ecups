import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LeagueRepository } from './league.repository';

@Injectable()
export class LeagueService {
  constructor(
    @InjectRepository(LeagueRepository)
    private readonly _leagueRepository: LeagueRepository,
  ) {}
}
