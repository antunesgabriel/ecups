import { IFeedback } from '@interfaces/feedback.interface';
import { LeagueEntity } from '@models/league.entity';

export interface ILeagueFeedback extends IFeedback {
  league: LeagueEntity;
}
