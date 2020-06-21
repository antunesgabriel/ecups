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
const game_service_1 = require("./game.service");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const user_guard_1 = require("../../../guards/user.guard");
const roles_decorator_1 = require("../../../decorators/roles.decorator");
const game_create_dto_1 = require("./dto/game-create.dto");
const game_update_dto_1 = require("./dto/game-update.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multerConfigs_1 = require("../../../configs/multerConfigs");
const URL = process.env.APP_URL;
let GameController = class GameController {
    constructor(_gameService) {
        this._gameService = _gameService;
    }
    async index(page = 1, limit = 10, res) {
        limit = +limit > 30 ? 30 : limit;
        page = +page ? +page : 1;
        const paginate = await this._gameService.index({
            limit,
            page,
            route: `${URL}/game`,
        });
        return res.status(common_1.HttpStatus.OK).json(paginate);
    }
    async store(gameCreateDTO, file, res) {
        gameCreateDTO.logo = file.filename;
        const feedback = await this._gameService.create(gameCreateDTO);
        return res.status(common_1.HttpStatus.CREATED).json(feedback);
    }
    async update(gameId, gameUpdateDTO, file, res) {
        if (file) {
            gameUpdateDTO.logo = file.filename;
        }
        const feedback = await this._gameService.update(gameId, gameUpdateDTO);
        return res.status(common_1.HttpStatus.OK).json(feedback);
    }
    async destoy(gameId, res) {
        const feedback = await this._gameService.destroy(gameId);
        return res.status(common_1.HttpStatus.OK).json(feedback);
    }
    async all(res) {
        const list = await this._gameService.all();
        return res.status(common_1.HttpStatus.OK).json(list);
    }
};
__decorate([
    common_1.Get(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('ADMIN'),
    __param(0, common_1.Query('page')),
    __param(1, common_1.Query('limit')),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "index", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('ADMIN'),
    common_1.UsePipes(common_1.ValidationPipe),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('logo', {
        storage: multerConfigs_1.multerStorage,
        fileFilter: multerConfigs_1.imageFileFilter,
    })),
    __param(0, common_1.Body()),
    __param(1, common_1.UploadedFile()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [game_create_dto_1.GameCreateDTO, Object, Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "store", null);
__decorate([
    common_1.Put(':gameId'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('ADMIN'),
    common_1.UsePipes(common_1.ValidationPipe),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('logo', {
        storage: multerConfigs_1.multerStorage,
        fileFilter: multerConfigs_1.imageFileFilter,
    })),
    __param(0, common_1.Param('gameId')),
    __param(1, common_1.Body()),
    __param(2, common_1.UploadedFile()),
    __param(3, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, game_update_dto_1.GameUpdateDTO, Object, Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "update", null);
__decorate([
    common_1.Delete(':gameId'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('ADMIN'),
    __param(0, common_1.Param('gameId')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "destoy", null);
__decorate([
    common_1.Get('all'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GameController.prototype, "all", null);
GameController = __decorate([
    common_1.Controller('game'),
    __metadata("design:paramtypes", [game_service_1.GameService])
], GameController);
exports.GameController = GameController;
//# sourceMappingURL=game.controller.js.map