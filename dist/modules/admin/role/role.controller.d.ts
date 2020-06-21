import { Response } from 'express';
import { RoleService } from './role.service';
import { RoleCreateDTO } from './dto/role-create.dto';
import { RoleUpdateDTO } from './dto/role-update.dto';
export declare class RoleController {
    private readonly _roleService;
    constructor(_roleService: RoleService);
    index(page: number, limit: number, res: Response): Promise<Response>;
    store(roleCreateDTO: RoleCreateDTO, res: Response): Promise<Response>;
    update(roleId: number, roleUpdateDTO: RoleUpdateDTO, res: Response): Promise<Response>;
    destoy(roleId: number, res: Response): Promise<Response>;
}
