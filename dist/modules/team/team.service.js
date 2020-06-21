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
const team_repository_1 = require("./team.repository");
const user_service_1 = require("../user/user.service");
const user_interface_1 = require("../../utils/user.interface");
const user_entity_1 = require("../../entities/user.entity");
const feedback_interface_1 = require("../../interfaces/feedback.interface");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const team_entity_1 = require("../../entities/team.entity");
let TeamService = class TeamService {
    constructor(_teamRepository, _userService) {
        this._teamRepository = _teamRepository;
        this._userService = _userService;
    }
    async paginate(options) {
        const query = this._teamRepository
            .createQueryBuilder('team')
            .leftJoinAndSelect('team.members', 'members')
            .orderBy('team.teamId', 'ASC');
        return nestjs_typeorm_paginate_1.paginate(query, options);
    }
    async create(teamDTO, authUser) {
        teamDTO.team = teamDTO.team.trim();
        const user = await this._userService.findByNickname(authUser.nickname);
        if (user.team) {
            throw new common_1.BadRequestException('Você não pode criar um time pois já faz parte de um');
        }
        if (await this._teamRepository.findOne({ team: teamDTO.team })) {
            throw new common_1.BadRequestException('Já existe um time com este nome');
        }
        const newTeam = this._teamRepository.create(teamDTO);
        newTeam.boss = user;
        newTeam.members = [user];
        const team = await this._teamRepository.save(newTeam);
        delete team.members;
        delete team.boss;
        return { message: 'Time criado com sucesso', team };
    }
    async update(teamId, teamDTO, authUser) {
        teamDTO.team = teamDTO.team.trim();
        const team = await this._teamRepository.findOne({ teamId });
        const user = await this._userService.findByNickname(authUser.nickname);
        if (!team) {
            throw new common_1.NotFoundException('Time não encotrado');
        }
        if (team.teamId !== user.team.teamId) {
            throw new common_1.NotFoundException('Você não faz parte deste time');
        }
        if (!(await this.isBoss(teamId, user))) {
            throw new common_1.BadRequestException('Somente o lider do time pode fazer alterações');
        }
        if (teamDTO.team !== team.team &&
            (await this._teamRepository.findOne({ team: teamDTO.team }))) {
            throw new common_1.BadRequestException('Ja existe um time com este nome');
        }
        team.team = teamDTO.team;
        team.bio = teamDTO.bio;
        const reloaded = await this._teamRepository.save(team);
        delete reloaded.members;
        delete reloaded.boss;
        return { message: 'Time atualizado', team: reloaded };
    }
    async destroy(teamId, authUser) {
        const team = await this._teamRepository.findOne({ teamId });
        if (!team) {
            throw new common_1.NotFoundException('Time não encotrado');
        }
        const user = await this._userService.findByNickname(authUser.nickname);
        if (!(await this.isBoss(teamId, user))) {
            throw new common_1.BadRequestException('Somente o lider do time pode excluir o time');
        }
        await this._teamRepository.softDelete(team);
        return { message: 'time excluido' };
    }
    async updateShield(teamId, filename, authUser) {
        const team = await this._teamRepository.findOne({ teamId });
        if (!team) {
            throw new common_1.NotFoundException('Time não encotrado');
        }
        const user = await this._userService.findByNickname(authUser.nickname);
        if (!(await this.isBoss(teamId, user))) {
            throw new common_1.BadRequestException('Somente o lider do time pode alterar o escudo');
        }
        team.shield = filename;
        await this._teamRepository.save(team);
        return { message: 'Escudo atualizado', filename };
    }
    async show(authUser) {
        const user = await this._userService.findByNickname(authUser.nickname);
        if (!user.team) {
            throw new common_1.BadRequestException('Você não faz parte de um time, crie um ou aceite o convite de algum time');
        }
        const team = await this._teamRepository.findOne({
            where: { teamId: user.team.teamId },
            relations: ['boss', 'members'],
        });
        return { team };
    }
    async isBoss(teamId, user) {
        return await this._teamRepository.findOne({
            where: { teamId, boss: user },
            relations: ['boss', 'members'],
        });
    }
    async findById(teamId) {
        return await this._teamRepository.findOne({
            where: { teamId },
            relations: ['boss', 'members'],
        });
    }
    async save(team) {
        return await this._teamRepository.save(team);
    }
};
TeamService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(team_repository_1.TeamRepository)),
    __metadata("design:paramtypes", [team_repository_1.TeamRepository,
        user_service_1.UserService])
], TeamService);
exports.TeamService = TeamService;
//# sourceMappingURL=team.service.js.map