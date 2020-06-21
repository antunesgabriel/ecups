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
const invitation_service_1 = require("./invitation.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const user_guard_1 = require("../../guards/user.guard");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const user_decorator_1 = require("../../decorators/user.decorator");
const user_interface_1 = require("../../utils/user.interface");
const invitation_create_dto_1 = require("./dto/invitation-create.dto");
const invitation_update_dto_1 = require("./dto/invitation-update.dto");
let InvitationController = class InvitationController {
    constructor(_invitationService) {
        this._invitationService = _invitationService;
    }
    async index(res, authUser) {
        const invitations = await this._invitationService.index(authUser);
        return res.status(common_1.HttpStatus.OK).json({ invitations });
    }
    async store(res, authUser, invitationDTO) {
        const feedback = await this._invitationService.create(invitationDTO, authUser);
        return res.status(common_1.HttpStatus.CREATED).json(feedback);
    }
    async update(invitationDTO, authUser, res) {
        const feedback = await this._invitationService.update(invitationDTO, authUser);
        return res.status(common_1.HttpStatus.OK).json(feedback);
    }
};
__decorate([
    common_1.Get(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('PLAYER'),
    __param(0, common_1.Res()),
    __param(1, user_decorator_1.User()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InvitationController.prototype, "index", null);
__decorate([
    common_1.Post(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('PLAYER'),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Res()),
    __param(1, user_decorator_1.User()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, invitation_create_dto_1.InvitationCreateDTO]),
    __metadata("design:returntype", Promise)
], InvitationController.prototype, "store", null);
__decorate([
    common_1.Put(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard, user_guard_1.UserGuard),
    roles_decorator_1.Roles('PLAYER'),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __param(1, user_decorator_1.User()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [invitation_update_dto_1.InvitationUpdateDTO, Object, Object]),
    __metadata("design:returntype", Promise)
], InvitationController.prototype, "update", null);
InvitationController = __decorate([
    common_1.Controller('invitation'),
    __metadata("design:paramtypes", [invitation_service_1.InvitationService])
], InvitationController);
exports.InvitationController = InvitationController;
//# sourceMappingURL=invitation.controller.js.map