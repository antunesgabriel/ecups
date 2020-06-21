import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UserEntity } from '@entities/user.entity';
export declare class AuthService {
    private readonly _userRespository;
    private readonly _jwtService;
    constructor(_userRespository: Repository<UserEntity>, _jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    loginUser(payload: any): Promise<any>;
}
