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
const class_transformer_1 = require("class-transformer");
const bcryptjs_1 = require("bcryptjs");
const address_entity_1 = require("./address.entity");
const role_entity_1 = require("./role.entity");
const league_entity_1 = require("./league.entity");
const team_entity_1 = require("./team.entity");
let UserEntity = class UserEntity {
    async hashPassword(pass) {
        const rounds = bcryptjs_1.getRounds(pass || this.password);
        if (!rounds) {
            const SALT = Number(process.env.CONF_PASS_SALT);
            this.password = await bcryptjs_1.hash(pass || this.password, SALT);
            return this.password;
        }
    }
    async checkPassword(password) {
        return await bcryptjs_1.compare(password, this.password);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'user_id' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: 'varchar' }),
    __metadata("design:type", String)
], UserEntity.prototype, "surname", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, unique: true, type: 'varchar' }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, unique: true, type: 'varchar' }),
    __metadata("design:type", String)
], UserEntity.prototype, "nickname", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, select: false, type: 'varchar' }),
    class_transformer_1.Exclude(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, default: null, type: 'text' }),
    __metadata("design:type", String)
], UserEntity.prototype, "avatar", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'created_at' }),
    class_transformer_1.Exclude(),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ name: 'updated_at', insert: false, nullable: true }),
    class_transformer_1.Exclude(),
    __metadata("design:type", Date)
], UserEntity.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.OneToOne(() => address_entity_1.AddressEntity, address => address.user, { eager: true }),
    typeorm_1.JoinColumn({ name: 'address_id' }),
    __metadata("design:type", address_entity_1.AddressEntity)
], UserEntity.prototype, "address", void 0);
__decorate([
    typeorm_1.ManyToOne(() => role_entity_1.RoleEntity, role => role.users, { eager: true }),
    typeorm_1.JoinColumn({ name: 'role_id' }),
    __metadata("design:type", role_entity_1.RoleEntity)
], UserEntity.prototype, "role", void 0);
__decorate([
    typeorm_1.OneToMany(() => league_entity_1.LeagueEntity, league => league.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "leagues", void 0);
__decorate([
    typeorm_1.ManyToOne(() => team_entity_1.TeamEntity, team => team.members, { onDelete: 'SET NULL' }),
    typeorm_1.JoinColumn({ name: 'team_id' }),
    __metadata("design:type", team_entity_1.TeamEntity)
], UserEntity.prototype, "team", void 0);
__decorate([
    typeorm_1.OneToOne(() => team_entity_1.TeamEntity, team => team.boss, { onDelete: 'SET NULL' }),
    __metadata("design:type", team_entity_1.TeamEntity)
], UserEntity.prototype, "myTeam", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserEntity.prototype, "hashPassword", null);
UserEntity = __decorate([
    typeorm_1.Entity({ name: 'users' })
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map