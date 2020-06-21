"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("../../entities/user.entity");
const class_transformer_1 = require("class-transformer");
let AuthService = class AuthService {
    constructor(_userRespository, _jwtService) {
        this._userRespository = _userRespository;
        this._jwtService = _jwtService;
    }
    async validateUser(email, password) {
        const user = await this._userRespository.findOne({
            where: { email: email },
            select: [
                'email',
                'password',
                'name',
                'surname',
                'avatar',
                'userId',
                'nickname',
            ],
            relations: ['role', 'address', 'team'],
        });
        if (!user) {
            throw new common_1.BadRequestException('Email informado não possui cadastro na plataforma');
        }
        if (!(await user.checkPassword(password))) {
            throw new common_1.UnauthorizedException('Senha incorreta');
        }
        return class_transformer_1.classToPlain(user);
    }
    async loginUser(payload) {
        const _token = this._jwtService.sign({
            email: payload.email,
            nickname: payload.nickname,
            userId: payload.userId,
            role: payload.role.role,
        });
        return { _token, user: payload };
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map