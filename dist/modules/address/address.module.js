"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const address_service_1 = require("./address.service");
const address_controller_1 = require("./address.controller");
const typeorm_1 = require("@nestjs/typeorm");
const address_repository_1 = require("./address.repository");
const user_module_1 = require("../user/user.module");
let AddressModule = class AddressModule {
};
AddressModule = __decorate([
    common_1.Module({
        providers: [address_service_1.AddressService],
        controllers: [address_controller_1.AddressController],
        imports: [typeorm_1.TypeOrmModule.forFeature([address_repository_1.AddressRepository]), user_module_1.UserModule],
    })
], AddressModule);
exports.AddressModule = AddressModule;
//# sourceMappingURL=address.module.js.map