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
const game_entity_1 = require("./game.entity");
const leagueType_entity_1 = require("./leagueType.entity");
const class_transformer_1 = require("class-transformer");
const user_entity_1 = require("./user.entity");
let LeagueEntity = class LeagueEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'league_id' }),
    __metadata("design:type", Number)
], LeagueEntity.prototype, "leagueId", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, unique: true }),
    __metadata("design:type", String)
], LeagueEntity.prototype, "league", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], LeagueEntity.prototype, "rules", void 0);
__decorate([
    typeorm_1.Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], LeagueEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ name: 'round_trip', type: 'boolean', nullable: false }),
    __metadata("design:type", Boolean)
], LeagueEntity.prototype, "roundTrip", void 0);
__decorate([
    typeorm_1.Column({
        name: 'max_participants',
        nullable: true,
        type: 'int',
        default: null,
    }),
    __metadata("design:type", Number)
], LeagueEntity.prototype, "maxParticipants", void 0);
__decorate([
    typeorm_1.Column({
        nullable: false,
        type: 'boolean',
        name: 'for_teams',
        default: true,
    }),
    __metadata("design:type", Boolean)
], LeagueEntity.prototype, "forTeams", void 0);
__decorate([
    typeorm_1.Column({ name: 'league_start', nullable: true, type: 'timestamp' }),
    __metadata("design:type", Date)
], LeagueEntity.prototype, "leagueStart", void 0);
__decorate([
    typeorm_1.Column({ name: 'league_end', nullable: true, type: 'timestamp' }),
    __metadata("design:type", Date)
], LeagueEntity.prototype, "leagueEnd", void 0);
__decorate([
    typeorm_1.Column({ name: 'need_address', nullable: false, type: 'boolean' }),
    __metadata("design:type", Boolean)
], LeagueEntity.prototype, "needAddress", void 0);
__decorate([
    typeorm_1.Column({ name: 'started', nullable: false, type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], LeagueEntity.prototype, "started", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, default: true, type: 'boolean' }),
    __metadata("design:type", Boolean)
], LeagueEntity.prototype, "active", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: null, type: 'text' }),
    __metadata("design:type", String)
], LeagueEntity.prototype, "thumb", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'created_at' }),
    class_transformer_1.Exclude(),
    __metadata("design:type", Date)
], LeagueEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ name: 'updated_at', insert: false, nullable: true }),
    class_transformer_1.Exclude(),
    __metadata("design:type", Date)
], LeagueEntity.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.DeleteDateColumn({
        name: 'deleted_at',
        nullable: true,
        default: null,
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], LeagueEntity.prototype, "deletedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(() => game_entity_1.GameEntity, game => game.leagues),
    typeorm_1.JoinColumn({ name: 'game_id' }),
    __metadata("design:type", game_entity_1.GameEntity)
], LeagueEntity.prototype, "game", void 0);
__decorate([
    typeorm_1.ManyToOne(() => leagueType_entity_1.LeagueTypeEntity, type => type.leagues),
    typeorm_1.JoinColumn({ name: 'leaguetype_id' }),
    __metadata("design:type", leagueType_entity_1.LeagueTypeEntity)
], LeagueEntity.prototype, "leagueType", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.UserEntity, user => user.leagues, { eager: true }),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], LeagueEntity.prototype, "user", void 0);
LeagueEntity = __decorate([
    typeorm_1.Entity({ name: 'leagues' })
], LeagueEntity);
exports.LeagueEntity = LeagueEntity;
//# sourceMappingURL=league.entity.js.map