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
const platform_express_1 = require("@nestjs/platform-express");
const user_service_1 = require("../user/user.service");
const multerConfigs_1 = require("../../configs/multerConfigs");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_guard_1 = require("../../guards/user.guard");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const user_decorator_1 = require("../../decorators/user.decorator");
const user_interface_1 = require("../../utils/user.interface");
let AvatarController = class AvatarController {
    constructor(_userService) {
        this._userService = _userService;
    }
    async store(file, res, user) {
        if (!file) {
            throw new common_1.BadRequestException('Por favor selecione uma foto para upload');
        }
        const filename = await this._userService.updateAvatar(file.filename, user);
        return res.status(common_1.HttpStatus.OK).json({ filename });
    }
};
__decorate([
    common_1.Post(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('ADMIN', 'PLAYER'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('avatar', {
        storage: multerConfigs_1.multerStorage,
        fileFilter: multerConfigs_1.imageFileFilter,
    })),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Res()),
    __param(2, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AvatarController.prototype, "store", null);
AvatarController = __decorate([
    common_1.Controller('avatar'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AvatarController);
exports.AvatarController = AvatarController;
//# sourceMappingURL=avatar.controller.js.map