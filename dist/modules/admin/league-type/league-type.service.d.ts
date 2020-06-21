import { Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { IFeedback } from '@interfaces/feedback.interface';
import { LeagueTypeRepository } from './league-type.repository';
import { LeagueTypeEntity } from '@entities/leagueType.entity';
import { LeagueTypeDTO } from './dto/league-type.dto';
export declare class LeagueTypeService {
    private readonly _leagueTypeRepository;
    constructor(_leagueTypeRepository: LeagueTypeRepository);
    index(options: IPaginationOptions): Promise<Pagination<LeagueTypeEntity>>;
    create(leagueDTO: LeagueTypeDTO): Promise<IFeedback>;
    update(leagueTypeId: number, leagueDTO: LeagueTypeDTO): Promise<IFeedback>;
    destroy(leagueTypeId: number): Promise<IFeedback>;
    all(): Promise<LeagueTypeEntity[] | null>;
    findById(leagueTypeId: number): Promise<LeagueTypeEntity>;
}
