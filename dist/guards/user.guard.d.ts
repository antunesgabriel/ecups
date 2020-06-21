import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export declare class UserGuard implements CanActivate {
    private readonly _reflector;
    constructor(_reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean> | boolean;
}
