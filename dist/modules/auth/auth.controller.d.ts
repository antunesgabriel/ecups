import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';
export declare class AuthController {
    private readonly _authService;
    constructor(_authService: AuthService);
    store(req: any, login: LoginDTO): Promise<any>;
}
