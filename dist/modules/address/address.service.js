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
const typeorm_1 = require("@nestjs/typeorm");
const address_repository_1 = require("./address.repository");
const user_service_1 = require("../user/user.service");
const user_interface_1 = require("../../utils/user.interface");
const address_entity_1 = require("../../entities/address.entity");
let AddressService = class AddressService {
    constructor(_addressRepository, _userService) {
        this._addressRepository = _addressRepository;
        this._userService = _userService;
    }
    async save(user, endereco) {
        const authUser = await this._userService.findByNickname(user.nickname);
        if (authUser.address) {
            const { address } = authUser;
            return await this.update(address, endereco);
        }
        return await this.create(authUser.nickname, endereco);
    }
    async create(nickname, data) {
        const address = await this._addressRepository.save(this._addressRepository.create(data));
        await this._userService.addAddress(address, nickname);
        return address;
    }
    async update(address, data) {
        await this._addressRepository.update({
            addressId: address.addressId,
        }, Object.assign({}, data));
        return await this._addressRepository.findOne({
            addressId: address.addressId,
        });
    }
};
AddressService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(address_repository_1.AddressRepository)),
    __metadata("design:paramtypes", [address_repository_1.AddressRepository,
        user_service_1.UserService])
], AddressService);
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map