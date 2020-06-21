import { Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { IFeedback } from '@interfaces/feedback.interface';
import { RoleRepository } from './role.repository';
import { RoleCreateDTO } from './dto/role-create.dto';
import { RoleUpdateDTO } from './dto/role-update.dto';
import { RoleEntity } from '@entities/role.entity';
export declare class RoleService {
    private readonly _roleRepository;
    constructor(_roleRepository: RoleRepository);
    index(options: IPaginationOptions): Promise<Pagination<RoleEntity>>;
    create(role: RoleCreateDTO): Promise<IFeedback>;
    update(roleId: number, role: RoleUpdateDTO): Promise<IFeedback>;
    destroy(roleId: number): Promise<IFeedback>;
    findOrCreate(role: string): Promise<RoleEntity>;
}
