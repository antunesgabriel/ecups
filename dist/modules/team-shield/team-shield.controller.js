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
const platform_express_1 = require("@nestjs/platform-express");
const team_service_1 = require("../team/team.service");
const user_decorator_1 = require("../../decorators/user.decorator");
const user_interface_1 = require("../../utils/user.interface");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_guard_1 = require("../../guards/user.guard");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const multerConfigs_1 = require("../../configs/multerConfigs");
let TeamShieldController = class TeamShieldController {
    constructor(_teamService) {
        this._teamService = _teamService;
    }
    async update(file, res, teamId, user) {
        const feedback = await this._teamService.updateShield(teamId, file.filename, user);
        return res.status(common_1.HttpStatus.OK).json(feedback);
    }
};
__decorate([
    common_1.Put(':teamId'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('PLAYER'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('shield', {
        storage: multerConfigs_1.multerStorage,
        fileFilter: multerConfigs_1.imageFileFilter,
    })),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Res()),
    __param(2, common_1.Param('teamId')),
    __param(3, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number, Object]),
    __metadata("design:returntype", Promise)
], TeamShieldController.prototype, "update", null);
TeamShieldController = __decorate([
    common_1.Controller('team-shield'),
    __metadata("design:paramtypes", [team_service_1.TeamService])
], TeamShieldController);
exports.TeamShieldController = TeamShieldController;
//# sourceMappingURL=team-shield.controller.js.map