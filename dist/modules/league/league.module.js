"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const league_controller_1 = require("./league.controller");
const league_service_1 = require("./league.service");
const typeorm_1 = require("@nestjs/typeorm");
const league_repository_1 = require("./league.repository");
const user_module_1 = require("../user/user.module");
const league_type_module_1 = require("../admin/league-type/league-type.module");
const game_module_1 = require("../admin/game/game.module");
let LeagueModule = class LeagueModule {
};
LeagueModule = __decorate([
    common_1.Module({
        controllers: [league_controller_1.LeagueController],
        providers: [league_service_1.LeagueService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([league_repository_1.LeagueRepository]),
            user_module_1.UserModule,
            league_type_module_1.LeagueTypeModule,
            game_module_1.GameModule,
        ],
        exports: [league_service_1.LeagueService],
    })
], LeagueModule);
exports.LeagueModule = LeagueModule;
//# sourceMappingURL=league.module.js.map