import { Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { LeagueRepository } from './league.repository';
import { LeagueEntity } from '@entities/league.entity';
import { IUser } from '@utils/user.interface';
import { IFeedback } from '@interfaces/feedback.interface';
import { LeagueCreateDTO } from './dto/league-create.dto';
import { UserService } from '@modules/user/user.service';
import { ILeagueFeedback } from './league-feedback.interface';
import { LeagueUpdateDTO } from './dto/league-update.dto';
import { LeagueTypeService } from '@modules/admin/league-type/league-type.service';
import { GameService } from '@modules/admin/game/game.service';
export declare class LeagueService {
    private readonly _leagueRepository;
    private readonly _userService;
    private readonly _leagueTypeService;
    private readonly _gameService;
    constructor(_leagueRepository: LeagueRepository, _userService: UserService, _leagueTypeService: LeagueTypeService, _gameService: GameService);
    index(options: IPaginationOptions, authUser: IUser): Promise<Pagination<LeagueEntity>>;
    create(leagueCreateDTO: LeagueCreateDTO, authUser: IUser): Promise<ILeagueFeedback>;
    show(leagueId: number): Promise<LeagueEntity>;
    update(leagueId: number, leagueUpdateDTO: LeagueUpdateDTO, authUser: IUser): Promise<ILeagueFeedback>;
    destroy(leagueId: number, authUser: IUser): Promise<IFeedback>;
    all(options: IPaginationOptions, leagueId?: number): Promise<Pagination<LeagueEntity> | any>;
    updateThumb(leagueId: number, filename: string, authUser: IUser): Promise<ILeagueFeedback>;
    info(): Promise<any>;
    findById(leagueId: number, userId?: number): Promise<LeagueEntity | null>;
}
