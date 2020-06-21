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
const league_service_1 = require("../league/league.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_guard_1 = require("../../guards/user.guard");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const platform_express_1 = require("@nestjs/platform-express");
const multerConfigs_1 = require("../../configs/multerConfigs");
const user_decorator_1 = require("../../decorators/user.decorator");
const user_interface_1 = require("../../utils/user.interface");
let LeagueThumbController = class LeagueThumbController {
    constructor(_leagueService) {
        this._leagueService = _leagueService;
    }
    async update(file, res, leagueId, user) {
        const feedback = await this._leagueService.updateThumb(leagueId, file.filename, user);
        return res.status(common_1.HttpStatus.OK).json(feedback);
    }
};
__decorate([
    common_1.Put(':leagueId'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('ADMIN', 'PLAYER'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('thumb', {
        storage: multerConfigs_1.multerStorage,
        fileFilter: multerConfigs_1.imageFileFilter,
    })),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Res()),
    __param(2, common_1.Param('leagueId')),
    __param(3, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number, Object]),
    __metadata("design:returntype", Promise)
], LeagueThumbController.prototype, "update", null);
LeagueThumbController = __decorate([
    common_1.Controller('league-thumb'),
    __metadata("design:paramtypes", [league_service_1.LeagueService])
], LeagueThumbController);
exports.LeagueThumbController = LeagueThumbController;
//# sourceMappingURL=league-thumb.controller.js.map