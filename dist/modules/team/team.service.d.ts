import { TeamRepository } from './team.repository';
import { UserService } from '@modules/user/user.service';
import { TeamDTO } from './dto/team.dto';
import { IUser } from '@utils/user.interface';
import { UserEntity } from '@entities/user.entity';
import { IFeedback } from '@interfaces/feedback.interface';
import { Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { TeamEntity } from '@entities/team.entity';
export declare class TeamService {
    private readonly _teamRepository;
    private readonly _userService;
    constructor(_teamRepository: TeamRepository, _userService: UserService);
    paginate(options: IPaginationOptions): Promise<Pagination<TeamEntity>>;
    create(teamDTO: TeamDTO, authUser: IUser): Promise<any>;
    update(teamId: number, teamDTO: TeamDTO, authUser: IUser): Promise<any>;
    destroy(teamId: number, authUser: IUser): Promise<IFeedback>;
    updateShield(teamId: number, filename: string, authUser: IUser): Promise<any>;
    show(authUser: IUser): Promise<any>;
    isBoss(teamId: number, user: UserEntity): Promise<TeamEntity | null>;
    findById(teamId: number): Promise<TeamEntity | null>;
    save(team: TeamEntity): Promise<TeamEntity>;
}
