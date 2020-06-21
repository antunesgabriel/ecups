import { AdminRepository } from './admin.repository';
import { AdminCreateDTO } from './dto/admin-create.dto';
import { RoleService } from '../role/role.service';
export declare class AdminService {
    private readonly _adminRepository;
    private readonly _roleService;
    constructor(_adminRepository: AdminRepository, _roleService: RoleService);
    create(adminCreateDTO: AdminCreateDTO): Promise<any>;
    checkKey(key: string): Promise<boolean>;
}
