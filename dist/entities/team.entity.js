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
const user_entity_1 = require("./user.entity");
let TeamEntity = class TeamEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'team_id' }),
    __metadata("design:type", Number)
], TeamEntity.prototype, "teamId", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: 'varchar', unique: true }),
    __metadata("design:type", String)
], TeamEntity.prototype, "team", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'text', default: null }),
    __metadata("design:type", String)
], TeamEntity.prototype, "shield", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: null, type: 'text' }),
    __metadata("design:type", String)
], TeamEntity.prototype, "bio", void 0);
__decorate([
    typeorm_1.DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], TeamEntity.prototype, "deletedAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => user_entity_1.UserEntity, user => user.team, { onDelete: 'SET NULL' }),
    __metadata("design:type", Array)
], TeamEntity.prototype, "members", void 0);
__decorate([
    typeorm_1.OneToOne(() => user_entity_1.UserEntity, user => user.myTeam, { onDelete: 'SET NULL' }),
    typeorm_1.JoinColumn({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.UserEntity)
], TeamEntity.prototype, "boss", void 0);
TeamEntity = __decorate([
    typeorm_1.Entity({ name: 'teams' })
], TeamEntity);
exports.TeamEntity = TeamEntity;
//# sourceMappingURL=team.entity.js.map