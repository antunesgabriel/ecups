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
let AddressEntity = class AddressEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'address_id' }),
    __metadata("design:type", Number)
], AddressEntity.prototype, "addressId", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: 'varchar' }),
    __metadata("design:type", String)
], AddressEntity.prototype, "cep", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: 'varchar' }),
    __metadata("design:type", String)
], AddressEntity.prototype, "street", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], AddressEntity.prototype, "complement", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: 'varchar' }),
    __metadata("design:type", String)
], AddressEntity.prototype, "district", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: 'varchar' }),
    __metadata("design:type", String)
], AddressEntity.prototype, "state", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], AddressEntity.prototype, "number", void 0);
__decorate([
    typeorm_1.OneToOne(() => user_entity_1.UserEntity, user => user.address),
    __metadata("design:type", user_entity_1.UserEntity)
], AddressEntity.prototype, "user", void 0);
AddressEntity = __decorate([
    typeorm_1.Entity({ name: 'address' })
], AddressEntity);
exports.AddressEntity = AddressEntity;
//# sourceMappingURL=address.entity.js.map