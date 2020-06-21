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
class UserUpdateDTO {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Forneça um email' }),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], UserUpdateDTO.prototype, "email", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserUpdateDTO.prototype, "password", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserUpdateDTO.prototype, "oldPassword", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Forneça um nome' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserUpdateDTO.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Forneça uma sobrenome' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserUpdateDTO.prototype, "surname", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Forneça uma nickname' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UserUpdateDTO.prototype, "nickname", void 0);
exports.UserUpdateDTO = UserUpdateDTO;
//# sourceMappingURL=user-update.dto.js.map