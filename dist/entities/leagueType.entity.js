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
const typeorm_1 = require("typeorm");
const league_entity_1 = require("./league.entity");
let LeagueTypeEntity = class LeagueTypeEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'leaguetype_id' }),
    __metadata("design:type", Number)
], LeagueTypeEntity.prototype, "leagueTypeId", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], LeagueTypeEntity.prototype, "type", void 0);
__decorate([
    typeorm_1.OneToMany(() => league_entity_1.LeagueEntity, league => league.leagueType),
    __metadata("design:type", Array)
], LeagueTypeEntity.prototype, "leagues", void 0);
LeagueTypeEntity = __decorate([
    typeorm_1.Entity({ name: 'league_type' })
], LeagueTypeEntity);
exports.LeagueTypeEntity = LeagueTypeEntity;
//# sourceMappingURL=leagueType.entity.js.map