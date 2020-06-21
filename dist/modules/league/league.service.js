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
const league_repository_1 = require("./league.repository");
const league_entity_1 = require("../../entities/league.entity");
const user_interface_1 = require("../../utils/user.interface");
const feedback_interface_1 = require("../../interfaces/feedback.interface");
const user_service_1 = require("../user/user.service");
const leagueDatesValidate_1 = require("../../helpers/leagueDatesValidate");
const league_type_service_1 = require("../admin/league-type/league-type.service");
const game_service_1 = require("../admin/game/game.service");
const date_fns_1 = require("date-fns");
const porcentage_1 = require("../../helpers/porcentage");
let LeagueService = class LeagueService {
    constructor(_leagueRepository, _userService, _leagueTypeService, _gameService) {
        this._leagueRepository = _leagueRepository;
        this._userService = _userService;
        this._leagueTypeService = _leagueTypeService;
        this._gameService = _gameService;
    }
    async index(options, authUser) {
        const query = this._leagueRepository
            .createQueryBuilder('league')
            .leftJoinAndSelect('league.game', 'game')
            .leftJoinAndSelect('league.leagueType', 'leagueType')
            .leftJoinAndSelect('league.user', 'user');
        if (authUser.role === 'PLAYER') {
            query.where(`user.userId = ${authUser.userId}`);
        }
        query.orderBy('league.createdAt', 'DESC');
        return nestjs_typeorm_paginate_1.paginate(query, options);
    }
    async create(leagueCreateDTO, authUser) {
        const user = await this._userService.findByNickname(authUser.nickname);
        if (await this._leagueRepository.findOne({ league: leagueCreateDTO.league })) {
            throw new common_1.BadRequestException('Já existe uma liga com este nome');
        }
        const result = leagueDatesValidate_1.default(leagueCreateDTO);
        if (!result.valid) {
            throw new common_1.BadRequestException(result.message);
        }
        const game = await this._gameService.findById(leagueCreateDTO.gameId);
        if (!game) {
            throw new common_1.BadRequestException('O game da liga não está cadastrado');
        }
        const leagueType = await this._leagueTypeService.findById(leagueCreateDTO.leagueTypeId);
        if (!leagueType) {
            throw new common_1.BadRequestException('O tipo de competição da liga não está cadastrada');
        }
        const newLeague = this._leagueRepository.create(Object.assign(Object.assign({}, leagueCreateDTO), { user,
            leagueType,
            game }));
        const league = await this._leagueRepository.save(newLeague);
        return { message: 'Liga criada com sucesso', league };
    }
    async show(leagueId) {
        const league = await this._leagueRepository.findOne({
            where: { leagueId },
            relations: ['leagueType', 'game'],
        });
        if (!league) {
            throw new common_1.BadRequestException('A liga informada não existe');
        }
        return league;
    }
    async update(leagueId, leagueUpdateDTO, authUser) {
        const leagueSelect = await this._leagueRepository.findOne({
            where: { leagueId },
            relations: ['user', 'leagueType', 'game'],
        });
        if (!leagueSelect) {
            throw new common_1.BadRequestException('A liga informada não existe');
        }
        if (authUser.role === 'PLAYER' &&
            leagueSelect.user.userId !== authUser.userId) {
            if (!leagueSelect) {
                throw new common_1.BadRequestException('Você não pode editar esta liga, pois pertence a outro usuario');
            }
        }
        if (leagueSelect.league !== leagueUpdateDTO.league &&
            (await this._leagueRepository.findOne({ league: leagueUpdateDTO.league }))) {
            throw new common_1.BadRequestException('Já existe uma liga com este nome');
        }
        leagueSelect.league = leagueUpdateDTO.league;
        leagueSelect.rules = leagueUpdateDTO.rules;
        leagueSelect.description = leagueUpdateDTO.description;
        leagueSelect.roundTrip = leagueUpdateDTO.roundTrip;
        leagueSelect.maxParticipants = leagueUpdateDTO.maxParticipants;
        leagueSelect.active = leagueUpdateDTO.active;
        const result = leagueDatesValidate_1.default(leagueUpdateDTO);
        if (!result.valid) {
            throw new common_1.BadRequestException(result.message);
        }
        leagueSelect.leagueStart = leagueUpdateDTO.leagueStart;
        leagueSelect.leagueEnd = leagueUpdateDTO.leagueEnd;
        const leagueUpdated = await this._leagueRepository.save(leagueSelect);
        return { message: 'Liga atualizada com sucesso', league: leagueUpdated };
    }
    async destroy(leagueId, authUser) {
        const leagueSelect = await this._leagueRepository.findOne({
            where: { leagueId },
            relations: ['user', 'leagueType', 'game'],
        });
        if (!leagueSelect) {
            throw new common_1.BadRequestException('A liga informada não existe');
        }
        if (authUser.role === 'PLAYER' &&
            leagueSelect.user.userId !== authUser.userId) {
            if (!leagueSelect) {
                throw new common_1.BadRequestException('Você não pode editar esta liga, pois pertence a outro usuario');
            }
        }
        await this._leagueRepository.softDelete({
            leagueId: leagueSelect.leagueId,
        });
        return { message: 'Liga deletada com sucesso' };
    }
    async all(options, leagueId = null) {
        if (leagueId) {
            const league = await this._leagueRepository.findOne({
                where: { leagueId },
                relations: ['leagueType', 'game', 'user'],
            });
            if (!league) {
                throw new common_1.BadRequestException('Liga não encontrada');
            }
            return { league: league };
        }
        const query = this._leagueRepository
            .createQueryBuilder('league')
            .innerJoinAndSelect('league.game', 'game')
            .innerJoinAndSelect('league.leagueType', 'leagueType')
            .innerJoinAndSelect('league.user', 'user')
            .where('league.active = :active AND league.leagueStart BETWEEN :start AND :end', {
            active: true,
            start: new Date(),
            end: date_fns_1.addYears(new Date(), 1),
        })
            .orderBy('league.createdAt', 'DESC');
        return nestjs_typeorm_paginate_1.paginate(query, options);
    }
    async updateThumb(leagueId, filename, authUser) {
        const leagueSelect = await this._leagueRepository.findOne({
            where: { leagueId },
            relations: ['user', 'leagueType', 'game'],
        });
        if (!leagueSelect) {
            throw new common_1.BadRequestException('A liga informada não existe');
        }
        if (authUser.role === 'PLAYER' &&
            leagueSelect.user.userId !== authUser.userId) {
            if (!leagueSelect) {
                throw new common_1.BadRequestException('Você não pode editar esta liga, pois pertence a outro usuario');
            }
        }
        leagueSelect.thumb = filename;
        const leagueUpdated = await this._leagueRepository.save(leagueSelect);
        return { message: 'Thumb atualizada com sucesso', league: leagueUpdated };
    }
    async info() {
        const now = new Date();
        const before = date_fns_1.subDays(now, 30);
        const beforeBefore = date_fns_1.subDays(before, 30);
        const queryValorFinal = this._leagueRepository
            .createQueryBuilder('league')
            .where('league.createdAt BETWEEN :before AND :now', {
            before,
            now,
        });
        const queryValorInicial = this._leagueRepository
            .createQueryBuilder('league')
            .where('league.createdAt BETWEEN :beforeBefore AND :before', {
            beforeBefore,
            before,
        });
        const [final, inicial, total] = await Promise.all([
            queryValorFinal.getCount(),
            queryValorInicial.getCount(),
            this._leagueRepository.count(),
        ]);
        const porcentage = porcentage_1.calcPorcentage(inicial, final);
        return {
            actual: final,
            before: inicial,
            porcentage,
            total,
        };
    }
    async findById(leagueId, userId = null) {
        if (userId) {
            return await this._leagueRepository
                .createQueryBuilder('league')
                .leftJoinAndSelect('league.user', 'user')
                .leftJoinAndSelect('league.game', 'game')
                .leftJoinAndSelect('league.leagueType', 'leagueType')
                .where('league.leagueId = :leagueId AND user.userId = :userId', {
                leagueId,
                userId,
            })
                .getOne();
        }
        return await this._leagueRepository.findOne({
            where: { leagueId },
            relations: ['user', 'game', 'leagueType'],
        });
    }
};
LeagueService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(league_repository_1.LeagueRepository)),
    __metadata("design:paramtypes", [league_repository_1.LeagueRepository,
        user_service_1.UserService,
        league_type_service_1.LeagueTypeService,
        game_service_1.GameService])
], LeagueService);
exports.LeagueService = LeagueService;
//# sourceMappingURL=league.service.js.map