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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../user/user.service");
const league_service_1 = require("../../league/league.service");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const user_guard_1 = require("../../../guards/user.guard");
const roles_decorator_1 = require("../../../decorators/roles.decorator");
let HomeController = class HomeController {
    constructor(_userService, _leagueService) {
        this._userService = _userService;
        this._leagueService = _leagueService;
    }
    async index() {
        const userInfo = await this._userService.info();
        const leagueInfo = await this._leagueService.info();
        return {
            userInfo,
            leagueInfo,
        };
    }
};
__decorate([
    common_1.Get(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('ADMIN'),
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "index", null);
HomeController = __decorate([
    common_1.Controller('admin/home'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        league_service_1.LeagueService])
], HomeController);
exports.HomeController = HomeController;
//# sourceMappingURL=home.controller.js.map