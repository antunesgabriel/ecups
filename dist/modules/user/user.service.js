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
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const user_entity_1 = require("../../entities/user.entity");
const user_repository_1 = require("./user.repository");
const feedback_interface_1 = require("../../interfaces/feedback.interface");
const role_service_1 = require("../admin/role/role.service");
const user_interface_1 = require("../../utils/user.interface");
const auth_service_1 = require("../auth/auth.service");
const address_entity_1 = require("../../entities/address.entity");
const date_fns_1 = require("date-fns");
const porcentage_1 = require("../../helpers/porcentage");
const team_entity_1 = require("../../entities/team.entity");
let UserService = class UserService {
    constructor(_userRepository, _roleService, _authService) {
        this._userRepository = _userRepository;
        this._roleService = _roleService;
        this._authService = _authService;
    }
    async index(options) {
        const playerRole = await this._roleService.findOrCreate('PLAYER');
        const query = this._userRepository
            .createQueryBuilder('user')
            .innerJoinAndSelect('user.role', 'role')
            .where(`role.role_id = ${playerRole.roleId}`)
            .orderBy('user.name', 'ASC');
        return nestjs_typeorm_paginate_1.paginate(query, options);
    }
    async create(user) {
        user.nickname = user.nickname.replace(/[\s\W]/gi, '');
        const isValid = await this.validateEmailNickname(user.email, user.nickname);
        if (isValid) {
            throw new common_1.BadRequestException(isValid);
        }
        const role = await this._roleService.findOrCreate('PLAYER');
        await this._userRepository.save(this._userRepository.create(Object.assign(Object.assign({}, user), { role })));
        return { message: 'Sua conta foi criada com sucesso!' };
    }
    async update(userId, user, userAuth) {
        let selectUser;
        if (userAuth.role === 'PLAYER') {
            selectUser = await this._userRepository.findOne({
                where: { nickname: userAuth.nickname },
                select: [
                    'avatar',
                    'name',
                    'nickname',
                    'password',
                    'email',
                    'surname',
                    'userId',
                ],
            });
        }
        if (userAuth.role === 'ADMIN') {
            selectUser = await this._userRepository.findOne({
                where: { userId },
                select: [
                    'avatar',
                    'name',
                    'nickname',
                    'password',
                    'email',
                    'surname',
                    'userId',
                ],
            });
            if (!selectUser) {
                throw new common_1.BadRequestException('Usuario informado não possui cadastro');
            }
        }
        if (user.password && !user.oldPassword) {
            throw new common_1.BadRequestException('Senha de confirmação invalida');
        }
        if (user.password && !(await selectUser.checkPassword(user.oldPassword))) {
            throw new common_1.BadRequestException('Senha de confirmação incorreta');
        }
        if (user.password && (await selectUser.checkPassword(user.oldPassword))) {
            user.password = await selectUser.hashPassword(user.password);
        }
        delete user.oldPassword;
        if (!user.password) {
            delete user.password;
        }
        if (user.email !== selectUser.email &&
            (await this.validateEmailNickname(user.email, null))) {
            throw new common_1.BadRequestException('Já existe um usuario cadastrado com este email');
        }
        if (user.nickname !== selectUser.nickname) {
            user.nickname = user.nickname.replace(/[\s\W]/gi, '');
        }
        if (user.nickname !== selectUser.nickname &&
            (await this.validateEmailNickname(null, user.nickname))) {
            throw new common_1.BadRequestException('Já existe um usuario cadastrado com este nickname');
        }
        await this._userRepository.update({ userId: selectUser.userId }, user);
        const updatedUser = await this._userRepository.findOne({
            where: { userId: selectUser.userId },
            relations: ['role', 'address', 'team'],
        });
        const payload = await this._authService.loginUser(updatedUser);
        return Object.assign({ message: 'Informações atualizadas' }, payload);
    }
    async destroy(userId) {
        if (!(await this._userRepository.findOne({ userId }))) {
            throw new common_1.BadRequestException('O usuario informado não existe');
        }
        await this._userRepository.delete({ userId });
        return { message: 'Usuario excluida com succeso' };
    }
    async validateEmailNickname(email, nickname) {
        let message;
        message = false;
        if (email && (await this._userRepository.findOne({ email }))) {
            message = 'Já existe um usuario cadastrado com este email';
        }
        if (nickname && (await this._userRepository.findOne({ nickname }))) {
            message = 'Já existe um usuario cadastrado com este nickname';
        }
        return message;
    }
    async updateAvatar(filename, user) {
        await this._userRepository.update({ userId: user.userId }, { avatar: filename });
        return filename;
    }
    async findByNickname(nickname) {
        return await this._userRepository.findOne({
            where: { nickname },
            relations: ['role', 'address', 'team'],
        });
    }
    async addAddress(address, nickname) {
        const result = await this._userRepository.update({ nickname }, { address });
        return result.affected;
    }
    async info() {
        const now = new Date();
        const before = date_fns_1.subDays(now, 30);
        const beforeBefore = date_fns_1.subDays(before, 30);
        const queryValorFinal = this._userRepository
            .createQueryBuilder('user')
            .innerJoinAndSelect('user.role', 'role')
            .where('user.createdAt BETWEEN :before AND :now', {
            before,
            now,
        });
        const queryValorInicial = this._userRepository
            .createQueryBuilder('user')
            .where('user.createdAt BETWEEN :beforeBefore AND :before', {
            beforeBefore,
            before,
        });
        const [[users, final], inicial, total] = await Promise.all([
            queryValorFinal.getManyAndCount(),
            queryValorInicial.getCount(),
            this._userRepository.count(),
        ]);
        const porcentage = porcentage_1.calcPorcentage(inicial, final);
        return {
            actual: final,
            before: inicial,
            porcentage,
            total,
            users,
        };
    }
    async setTeam(user, team) {
        return await this._userRepository.update({ userId: user.userId }, { team });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_repository_1.UserRepository)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        role_service_1.RoleService,
        auth_service_1.AuthService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map