import { Response } from 'express';
import { AdminService } from './admin.service';
import { AdminCreateDTO } from './dto/admin-create.dto';
export declare class AdminController {
    private readonly _adminService;
    constructor(_adminService: AdminService);
    store(adminCreateDTO: AdminCreateDTO, res: Response): Promise<Response>;
}
