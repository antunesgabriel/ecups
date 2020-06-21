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
const game_repository_1 = require("./game.repository");
const game_entity_1 = require("../../../entities/game.entity");
const feedback_interface_1 = require("../../../interfaces/feedback.interface");
let GameService = class GameService {
    constructor(_gameRepository) {
        this._gameRepository = _gameRepository;
    }
    async index(options) {
        const query = this._gameRepository
            .createQueryBuilder('game')
            .orderBy('game', 'ASC');
        return nestjs_typeorm_paginate_1.paginate(query, options);
    }
    async create(game) {
        if (await this._gameRepository.findOne({ game: game.game })) {
            throw new common_1.BadRequestException('Um jogo com o mesmo nome ja foi adcionado');
        }
        await this._gameRepository.save(this._gameRepository.create(game));
        return { message: 'Jogo adcionado a lista com sucesso' };
    }
    async update(gameId, game) {
        if (!(await this._gameRepository.findOne({ gameId }))) {
            throw new common_1.BadRequestException('O jogo informado não está cadastrado');
        }
        await this._gameRepository.update({ gameId }, { game: game.game, logo: game.logo });
        return { message: 'Informações de jogo atualizadas' };
    }
    async destroy(gameId) {
        if (!(await this._gameRepository.findOne({ gameId }))) {
            throw new common_1.BadRequestException('O jogo informado não está cadastrado');
        }
        await this._gameRepository.delete({ gameId });
        return { message: 'Jogo excluido com succeso' };
    }
    async all() {
        const games = await this._gameRepository.find();
        return games;
    }
    async findById(gameId) {
        return await this._gameRepository.findOne({ gameId });
    }
};
GameService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(game_repository_1.GameRepository)),
    __metadata("design:paramtypes", [game_repository_1.GameRepository])
], GameService);
exports.GameService = GameService;
//# sourceMappingURL=game.service.js.map