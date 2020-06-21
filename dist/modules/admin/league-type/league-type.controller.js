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
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const user_guard_1 = require("../../../guards/user.guard");
const roles_decorator_1 = require("../../../decorators/roles.decorator");
const league_type_service_1 = require("./league-type.service");
const league_type_dto_1 = require("./dto/league-type.dto");
const URL = process.env.APP_URL;
let LeagueTypeController = class LeagueTypeController {
    constructor(_leagueTypeService) {
        this._leagueTypeService = _leagueTypeService;
    }
    async index(page = 1, limit = 10, res) {
        limit = +limit > 30 ? 30 : limit;
        page = +page ? page : 1;
        const paginate = await this._leagueTypeService.index({
            limit,
            page,
            route: `${URL}/league-type`,
        });
        return res.status(common_1.HttpStatus.OK).json(paginate);
    }
    async store(leagueTypeDTO, res) {
        const feedback = await this._leagueTypeService.create(leagueTypeDTO);
        return res.status(common_1.HttpStatus.CREATED).json(feedback);
    }
    async update(leagueTypeId, leagueTypeDTO, res) {
        const feedback = await this._leagueTypeService.update(leagueTypeId, leagueTypeDTO);
        return res.status(common_1.HttpStatus.OK).json(feedback);
    }
    async destoy(leagueTypeId, res) {
        const feedback = await this._leagueTypeService.destroy(leagueTypeId);
        return res.status(common_1.HttpStatus.OK).json(feedback);
    }
    async all(res) {
        const list = await this._leagueTypeService.all();
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
], LeagueTypeController.prototype, "index", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('ADMIN'),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [league_type_dto_1.LeagueTypeDTO, Object]),
    __metadata("design:returntype", Promise)
], LeagueTypeController.prototype, "store", null);
__decorate([
    common_1.Put(':leagueTypeId'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('ADMIN'),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Param('leagueTypeId')),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, league_type_dto_1.LeagueTypeDTO, Object]),
    __metadata("design:returntype", Promise)
], LeagueTypeController.prototype, "update", null);
__decorate([
    common_1.Delete(':leagueTypeId'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('ADMIN'),
    __param(0, common_1.Param('leagueTypeId')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], LeagueTypeController.prototype, "destoy", null);
__decorate([
    common_1.Get('all'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LeagueTypeController.prototype, "all", null);
LeagueTypeController = __decorate([
    common_1.Controller('league-type'),
    __metadata("design:paramtypes", [league_type_service_1.LeagueTypeService])
], LeagueTypeController);
exports.LeagueTypeController = LeagueTypeController;
//# sourceMappingURL=league-type.controller.js.map