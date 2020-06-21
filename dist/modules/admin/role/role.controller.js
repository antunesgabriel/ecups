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
const role_service_1 = require("./role.service");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const user_guard_1 = require("../../../guards/user.guard");
const roles_decorator_1 = require("../../../decorators/roles.decorator");
const role_create_dto_1 = require("./dto/role-create.dto");
const role_update_dto_1 = require("./dto/role-update.dto");
const URL = process.env.APP_URL;
let RoleController = class RoleController {
    constructor(_roleService) {
        this._roleService = _roleService;
    }
    async index(page = 1, limit = 10, res) {
        limit = +limit > 30 ? 30 : limit;
        page = +page ? page : 1;
        const paginate = await this._roleService.index({
            limit,
            page,
            route: `${URL}/role`,
        });
        return res.status(common_1.HttpStatus.OK).json(paginate);
    }
    async store(roleCreateDTO, res) {
        const feedback = await this._roleService.create(roleCreateDTO);
        return res.status(common_1.HttpStatus.CREATED).json(feedback);
    }
    async update(roleId, roleUpdateDTO, res) {
        const feedback = await this._roleService.update(roleId, roleUpdateDTO);
        return res.status(common_1.HttpStatus.OK).json(feedback);
    }
    async destoy(roleId, res) {
        const feedback = await this._roleService.destroy(roleId);
        return res.status(common_1.HttpStatus.OK).json(feedback);
    }
};
__decorate([
    common_1.Get(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('ADMIN'),
    __param(0, common_1.Query('page')),
    __param(1, common_1.Query('limit')),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "index", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('ADMIN'),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_create_dto_1.RoleCreateDTO, Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "store", null);
__decorate([
    common_1.Put(':roleId'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('ADMIN'),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Param('roleId')),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, role_update_dto_1.RoleUpdateDTO, Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "update", null);
__decorate([
    common_1.Delete(':roleId'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('ADMIN'),
    __param(0, common_1.Param('roleId')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "destoy", null);
RoleController = __decorate([
    common_1.Controller('role'),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleController);
exports.RoleController = RoleController;
//# sourceMappingURL=role.controller.js.map