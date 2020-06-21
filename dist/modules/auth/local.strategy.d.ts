import { Strategy } from 'passport-local';
import { ModuleRef } from '@nestjs/core';
import { AuthService } from './auth.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    private moduleRef;
    constructor(authService: AuthService, moduleRef: ModuleRef);
    validate(email: string, password: string): Promise<any>;
}
export {};
