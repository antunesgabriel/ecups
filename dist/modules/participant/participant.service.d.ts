import { Model } from 'mongoose';
import { Participant } from './participant.model';
import { LeagueService } from '@modules/league/league.service';
import { ParticipantCreateDTO } from './dto/paticipant-create.dto';
import { IUser } from '@utils/user.interface';
import { UserEntity } from '@entities/user.entity';
export declare class ParticipantService {
    private readonly _participantModel;
    private readonly _leagueService;
    constructor(_participantModel: Model<Participant>, _leagueService: LeagueService);
    create(participantDTO: ParticipantCreateDTO, authUser: IUser): Promise<Participant>;
    update(): Promise<boolean>;
    find(creatorId: number, leagueId: number): Promise<Participant | null>;
    findOrCreate(authUser: IUser, participantDTO: ParticipantCreateDTO): Promise<Participant>;
    count(user: UserEntity): Promise<number | null>;
}
