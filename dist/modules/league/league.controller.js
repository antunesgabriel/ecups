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
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_guard_1 = require("../../guards/user.guard");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const league_service_1 = require("./league.service");
const user_decorator_1 = require("../../decorators/user.decorator");
const user_interface_1 = require("../../utils/user.interface");
const league_create_dto_1 = require("./dto/league-create.dto");
const league_update_dto_1 = require("./dto/league-update.dto");
const URL = process.env.APP_URL;
let LeagueController = class LeagueController {
    constructor(_leagueService) {
        this._leagueService = _leagueService;
    }
    async index(page = 1, limit = 10, res, user) {
        limit = +limit > 30 ? 30 : limit;
        page = +page ? page : 1;
        const paginate = await this._leagueService.index({
            limit,
            page,
            route: `${URL}/league`,
        }, user);
        return res.status(common_1.HttpStatus.OK).json(paginate);
    }
    async store(leagueCreateDTO, res, user) {
        const feedback = await this._leagueService.create(leagueCreateDTO, user);
        return res.status(common_1.HttpStatus.CREATED).json(feedback);
    }
    async update(leagueUpdateDTO, res, user, leagueId) {
        const feedback = await this._leagueService.update(leagueId, leagueUpdateDTO, user);
        return res.status(common_1.HttpStatus.OK).json(feedback);
    }
    async destroy(res, user, leagueId) {
        const feedback = await this._leagueService.destroy(leagueId, user);
        return res.status(common_1.HttpStatus.OK).json(feedback);
    }
    async show(leagueId, res) {
        if (!Number(leagueId)) {
            throw new common_1.BadRequestException('Tipo de dado invalido');
        }
        const league = await this._leagueService.show(leagueId);
        return res.status(common_1.HttpStatus.OK).json({ league });
    }
    async all(page = 1, limit = 10, leagueId, res) {
        limit = +limit > 30 ? 30 : limit;
        page = +page ? page : 1;
        if (leagueId) {
            if (!Number.isInteger(+leagueId) || !+leagueId) {
                throw new common_1.BadRequestException('Identificador de liga invalido');
            }
            leagueId = +leagueId;
        }
        const paginate = await this._leagueService.all({
            limit,
            page,
            route: `${URL}/league/all`,
        }, leagueId);
        return res.status(common_1.HttpStatus.OK).json(paginate);
    }
};
__decorate([
    common_1.Get(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('ADMIN', 'PLAYER'),
    __param(0, common_1.Query('page')),
    __param(1, common_1.Query('limit')),
    __param(2, common_1.Res()),
    __param(3, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], LeagueController.prototype, "index", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('ADMIN', 'PLAYER'),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [league_create_dto_1.LeagueCreateDTO, Object, Object]),
    __metadata("design:returntype", Promise)
], LeagueController.prototype, "store", null);
__decorate([
    common_1.Put(':leagueId'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('ADMIN', 'PLAYER'),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, user_decorator_1.User()),
    __param(3, common_1.Param('leagueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [league_update_dto_1.LeagueUpdateDTO, Object, Object, Number]),
    __metadata("design:returntype", Promise)
], LeagueController.prototype, "update", null);
__decorate([
    common_1.Delete(':leagueId'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('ADMIN', 'PLAYER'),
    __param(0, common_1.Res()),
    __param(1, user_decorator_1.User()),
    __param(2, common_1.Param('leagueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], LeagueController.prototype, "destroy", null);
__decorate([
    common_1.Get('show/:leagueId'),
    __param(0, common_1.Param('leagueId')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], LeagueController.prototype, "show", null);
__decorate([
    common_1.Get('all'),
    __param(0, common_1.Query('page')),
    __param(1, common_1.Query('limit')),
    __param(2, common_1.Query('leagueId')),
    __param(3, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number, Object]),
    __metadata("design:returntype", Promise)
], LeagueController.prototype, "all", null);
LeagueController = __decorate([
    common_1.Controller('league'),
    __metadata("design:paramtypes", [league_service_1.LeagueService])
], LeagueController);
exports.LeagueController = LeagueController;
//# sourceMappingURL=league.controller.js.map