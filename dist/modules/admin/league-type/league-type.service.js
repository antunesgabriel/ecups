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
const league_type_repository_1 = require("./league-type.repository");
const leagueType_entity_1 = require("../../../entities/leagueType.entity");
let LeagueTypeService = class LeagueTypeService {
    constructor(_leagueTypeRepository) {
        this._leagueTypeRepository = _leagueTypeRepository;
    }
    async index(options) {
        const query = this._leagueTypeRepository
            .createQueryBuilder('league')
            .orderBy('type', 'ASC');
        return nestjs_typeorm_paginate_1.paginate(query, options);
    }
    async create(leagueDTO) {
        if (await this._leagueTypeRepository.findOne({ type: leagueDTO.type })) {
            throw new common_1.BadRequestException('Já existe uma tipo de liga com este nome');
        }
        await this._leagueTypeRepository.save(this._leagueTypeRepository.create(leagueDTO));
        return { message: 'Liga criada' };
    }
    async update(leagueTypeId, leagueDTO) {
        if (!(await this._leagueTypeRepository.findOne({ leagueTypeId }))) {
            throw new common_1.BadRequestException('O tipo de liga informado não possui cadastro');
        }
        await this._leagueTypeRepository.update({ leagueTypeId }, { type: leagueDTO.type });
        return { message: 'Tipo de liga atualizada com sucesso' };
    }
    async destroy(leagueTypeId) {
        if (!(await this._leagueTypeRepository.findOne({ leagueTypeId }))) {
            throw new common_1.BadRequestException('Tipo de liga informado não está cadastrada');
        }
        await this._leagueTypeRepository.delete({ leagueTypeId });
        return { message: 'Função excluida com succeso' };
    }
    async all() {
        return await this._leagueTypeRepository.find();
    }
    async findById(leagueTypeId) {
        return await this._leagueTypeRepository.findOne({ leagueTypeId });
    }
};
LeagueTypeService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(league_type_repository_1.LeagueTypeRepository)),
    __metadata("design:paramtypes", [league_type_repository_1.LeagueTypeRepository])
], LeagueTypeService);
exports.LeagueTypeService = LeagueTypeService;
//# sourceMappingURL=league-type.service.js.map