import { IFeedback } from '@interfaces/feedback.interface';
import { LeagueEntity } from '@entities/league.entity';
export interface ILeagueFeedback extends IFeedback {
    league: LeagueEntity;
}
