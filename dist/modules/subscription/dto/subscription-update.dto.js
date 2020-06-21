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
const subscription_create_dto_1 = require("./subscription-create.dto");
const class_validator_1 = require("class-validator");
class SubscriptionUpdateDTO extends subscription_create_dto_1.SubscriptionCreateDTO {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Informe sua respota para esta inscrição' }),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], SubscriptionUpdateDTO.prototype, "accept", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Informe o id da inscrição' }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], SubscriptionUpdateDTO.prototype, "_id", void 0);
exports.SubscriptionUpdateDTO = SubscriptionUpdateDTO;
//# sourceMappingURL=subscription-update.dto.js.map