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
const team_service_1 = require("./team.service");
const user_guard_1 = require("../../guards/user.guard");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const team_dto_1 = require("./dto/team.dto");
const user_decorator_1 = require("../../decorators/user.decorator");
const user_interface_1 = require("../../utils/user.interface");
const URL = process.env.APP_URL;
let TeamController = class TeamController {
    constructor(_teamService) {
        this._teamService = _teamService;
    }
    async index(res, page = 1, limit = 10) {
        limit = +limit > 30 ? 30 : limit;
        page = +page ? page : 1;
        const list = await this._teamService.paginate({
            limit,
            page,
            route: `${URL}/team`,
        });
        return res.status(common_1.HttpStatus.OK).json(list);
    }
    async store(teamDTO, res, authUser) {
        const feedback = await this._teamService.create(teamDTO, authUser);
        return res.status(common_1.HttpStatus.CREATED).json(feedback);
    }
    async update(teamDTO, res, authUser, teamId) {
        const feedback = await this._teamService.update(teamId, teamDTO, authUser);
        return res.status(common_1.HttpStatus.OK).json(feedback);
    }
    async destroy(res, authUser, teamId) {
        const feedback = await this._teamService.destroy(teamId, authUser);
        return res.status(common_1.HttpStatus.OK).json(feedback);
    }
    async show(res, authUser) {
        const feedback = await this._teamService.show(authUser);
        return res.status(common_1.HttpStatus.OK).json(feedback);
    }
};
__decorate([
    common_1.Get(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('ADMIN'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query('page')),
    __param(2, common_1.Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "index", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('PLAYER'),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_dto_1.TeamDTO, Object, Object]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "store", null);
__decorate([
    common_1.Put(':teamId'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('PLAYER'),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, user_decorator_1.User()),
    __param(3, common_1.Param('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_dto_1.TeamDTO, Object, Object, Number]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "update", null);
__decorate([
    common_1.Delete(':teamId'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('PLAYER', 'ADMIN'),
    __param(0, common_1.Res()),
    __param(1, user_decorator_1.User()),
    __param(2, common_1.Param('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "destroy", null);
__decorate([
    common_1.Get('show'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('PLAYER'),
    __param(0, common_1.Res()), __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "show", null);
TeamController = __decorate([
    common_1.Controller('team'),
    __metadata("design:paramtypes", [team_service_1.TeamService])
], TeamController);
exports.TeamController = TeamController;
//# sourceMappingURL=team.controller.js.map