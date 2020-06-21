"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const game_service_1 = require("./game.service");
const game_controller_1 = require("./game.controller");
const typeorm_1 = require("@nestjs/typeorm");
const game_repository_1 = require("./game.repository");
let GameModule = class GameModule {
};
GameModule = __decorate([
    common_1.Module({
        providers: [game_service_1.GameService],
        controllers: [game_controller_1.GameController],
        imports: [typeorm_1.TypeOrmModule.forFeature([game_repository_1.GameRepository])],
        exports: [game_service_1.GameService],
    })
], GameModule);
exports.GameModule = GameModule;
//# sourceMappingURL=game.module.js.map