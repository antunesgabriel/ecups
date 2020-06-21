"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const league_type_controller_1 = require("./league-type.controller");
const league_type_service_1 = require("./league-type.service");
const typeorm_1 = require("@nestjs/typeorm");
const league_type_repository_1 = require("./league-type.repository");
let LeagueTypeModule = class LeagueTypeModule {
};
LeagueTypeModule = __decorate([
    common_1.Module({
        controllers: [league_type_controller_1.LeagueTypeController],
        providers: [league_type_service_1.LeagueTypeService],
        imports: [typeorm_1.TypeOrmModule.forFeature([league_type_repository_1.LeagueTypeRepository])],
        exports: [league_type_service_1.LeagueTypeService],
    })
], LeagueTypeModule);
exports.LeagueTypeModule = LeagueTypeModule;
//# sourceMappingURL=league-type.module.js.map