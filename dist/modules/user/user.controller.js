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
const user_service_1 = require("./user.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_guard_1 = require("../../guards/user.guard");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const user_create_dto_1 = require("./dto/user-create.dto");
const user_update_dto_1 = require("./dto/user-update.dto");
const user_decorator_1 = require("../../decorators/user.decorator");
const user_interface_1 = require("../../utils/user.interface");
const URL = process.env.APP_URL;
let UserController = class UserController {
    constructor(_userService) {
        this._userService = _userService;
    }
    async index(page = 1, limit = 10, res) {
        limit = +limit > 30 ? 30 : limit;
        page = +page ? page : 1;
        const paginate = await this._userService.index({
            limit,
            page,
            route: `${URL}/user`,
        });
        return res.status(common_1.HttpStatus.OK).json(paginate);
    }
    async store(userCreateDTO, res) {
        const feedback = await this._userService.create(userCreateDTO);
        return res.status(common_1.HttpStatus.CREATED).json(feedback);
    }
    async update(userId, userUpdateDTO, res, user) {
        const feedback = await this._userService.update(userId, userUpdateDTO, user);
        return res.status(common_1.HttpStatus.OK).json(feedback);
    }
    async destoy(userId, res) {
        const feedback = await this._userService.destroy(userId);
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
], UserController.prototype, "index", null);
__decorate([
    common_1.Post(),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_create_dto_1.UserCreateDTO, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "store", null);
__decorate([
    common_1.Put(':userId'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('ADMIN', 'PLAYER'),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Param('userId')),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __param(3, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_update_dto_1.UserUpdateDTO, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    common_1.Delete(':userId'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('ADMIN'),
    __param(0, common_1.Param('userId')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "destoy", null);
UserController = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map