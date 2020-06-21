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
const feedback_interface_1 = require("../../../interfaces/feedback.interface");
const role_repository_1 = require("./role.repository");
const role_entity_1 = require("../../../entities/role.entity");
let RoleService = class RoleService {
    constructor(_roleRepository) {
        this._roleRepository = _roleRepository;
    }
    async index(options) {
        const query = this._roleRepository
            .createQueryBuilder('role')
            .orderBy('role', 'ASC');
        return nestjs_typeorm_paginate_1.paginate(query, options);
    }
    async create(role) {
        const newRole = {
            role: role.role.toUpperCase(),
        };
        if (await this._roleRepository.findOne({ role: newRole.role })) {
            throw new common_1.BadRequestException('Uma função com o mesmo nome já foi adcionada');
        }
        await this._roleRepository.save(this._roleRepository.create(newRole));
        return { message: 'Função adcionado a lista com sucesso' };
    }
    async update(roleId, role) {
        if (!(await this._roleRepository.findOne({ roleId }))) {
            throw new common_1.BadRequestException('A função informado não está cadastrada');
        }
        await this._roleRepository.update({ roleId }, { role: role.role.toUpperCase() });
        return { message: 'Informações de Função atualizadas' };
    }
    async destroy(roleId) {
        const role = await this._roleRepository.findOne({ roleId });
        if (!role) {
            throw new common_1.BadRequestException('A função informado não está cadastrada');
        }
        if (role.role === 'PLAYER' || role.role === 'ADMIN') {
            throw new common_1.BadRequestException('Não é possivel excluir essa role pois faz parte do core do sistema');
        }
        await this._roleRepository.delete({ roleId });
        return { message: 'Função excluida com succeso' };
    }
    async findOrCreate(role) {
        let find = await this._roleRepository.findOne({ role });
        if (!find) {
            find = await this._roleRepository.save(this._roleRepository.create({ role }));
        }
        return find;
    }
};
RoleService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(role_repository_1.RoleRepository)),
    __metadata("design:paramtypes", [role_repository_1.RoleRepository])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map