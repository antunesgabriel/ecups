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
const class_validator_1 = require("class-validator");
class LeagueCreateDTO {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Informe o titulo da liga' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], LeagueCreateDTO.prototype, "league", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], LeagueCreateDTO.prototype, "rules", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], LeagueCreateDTO.prototype, "description", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Informe se o campeonato terá jogo de ida e volta' }),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], LeagueCreateDTO.prototype, "roundTrip", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], LeagueCreateDTO.prototype, "maxParticipants", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Informe se a liga é para time ou player' }),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], LeagueCreateDTO.prototype, "forTeams", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsDateString(),
    __metadata("design:type", Date)
], LeagueCreateDTO.prototype, "leagueStart", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsDateString(),
    __metadata("design:type", Date)
], LeagueCreateDTO.prototype, "leagueEnd", void 0);
__decorate([
    class_validator_1.IsNotEmpty({
        message: 'Informe se a liga necessita de informações de localização dos jogadores',
    }),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], LeagueCreateDTO.prototype, "needAddress", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Informe o tipo da liga' }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], LeagueCreateDTO.prototype, "leagueTypeId", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Informe o game da liga' }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], LeagueCreateDTO.prototype, "gameId", void 0);
exports.LeagueCreateDTO = LeagueCreateDTO;
//# sourceMappingURL=league-create.dto.js.map