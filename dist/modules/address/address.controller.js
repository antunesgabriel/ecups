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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const address_service_1 = require("./address.service");
const address_dto_1 = require("./dto/address.dto");
const user_decorator_1 = require("../../decorators/user.decorator");
const user_interface_1 = require("../../utils/user.interface");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_guard_1 = require("../../guards/user.guard");
const roles_decorator_1 = require("../../decorators/roles.decorator");
let AddressController = class AddressController {
    constructor(_addressService) {
        this._addressService = _addressService;
    }
    async store(address, res, user) {
        const result = await this._addressService.save(user, address);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
};
__decorate([
    common_1.Post(),
    common_1.UsePipes(common_1.ValidationPipe),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('PLAYER', 'ADMIN'),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __param(2, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [address_dto_1.AddressDTO, Object, Object]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "store", null);
AddressController = __decorate([
    common_1.Controller('address'),
    __metadata("design:paramtypes", [address_service_1.AddressService])
], AddressController);
exports.AddressController = AddressController;
//# sourceMappingURL=address.controller.js.map