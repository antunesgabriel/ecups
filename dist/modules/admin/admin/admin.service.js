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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const admin_repository_1 = require("./admin.repository");
const bcryptjs_1 = require("bcryptjs");
const role_service_1 = require("../role/role.service");
let AdminService = class AdminService {
    constructor(_adminRepository, _roleService) {
        this._adminRepository = _adminRepository;
        this._roleService = _roleService;
    }
    async create(adminCreateDTO) {
        const { key } = adminCreateDTO, rest = __rest(adminCreateDTO, ["key"]);
        if (!(await this.checkKey(key))) {
            throw new common_1.BadRequestException('Key incorreta');
        }
        if (await this._adminRepository.findOne({
            email: rest.email,
        })) {
            throw new common_1.BadRequestException('Já existe um usuario com este email');
        }
        if (await this._adminRepository.findOne({ nickname: rest.nickname })) {
            throw new common_1.BadRequestException('Já existe um usuario com este nickname');
        }
        const role = await this._roleService.findOrCreate('ADMIN');
        const admin = this._adminRepository.create(Object.assign(Object.assign({}, rest), { role }));
        await this._adminRepository.save(admin);
        return { message: 'Admin criado!' };
    }
    async checkKey(key) {
        const envKey = process.env.CONF_KEY;
        if (!envKey) {
            throw new common_1.InternalServerErrorException('A key para criar admin não foi atribuida');
        }
        const accept = await bcryptjs_1.compare(key, envKey);
        return accept;
    }
};
AdminService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(admin_repository_1.AdminRepository)),
    __metadata("design:paramtypes", [admin_repository_1.AdminRepository,
        role_service_1.RoleService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map