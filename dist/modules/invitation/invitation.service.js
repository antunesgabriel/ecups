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
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const notification_service_1 = require("../notification/notification.service");
const team_service_1 = require("../team/team.service");
const user_service_1 = require("../user/user.service");
const feedback_interface_1 = require("../../interfaces/feedback.interface");
const user_interface_1 = require("../../utils/user.interface");
const team_entity_1 = require("../../entities/team.entity");
let InvitationService = class InvitationService {
    constructor(_invitationModel, _notificationService, _userService, _teamService) {
        this._invitationModel = _invitationModel;
        this._notificationService = _notificationService;
        this._userService = _userService;
        this._teamService = _teamService;
    }
    async index(authUser) {
        const invitations = await this._invitationModel.find({
            userId: authUser.userId,
            accept: null,
        });
        return invitations;
    }
    async create(invitationCreateDTO, authUser) {
        invitationCreateDTO.nickname = invitationCreateDTO.nickname.replace(/[\s\W]/gi, '');
        const user = await this._userService.findByNickname(authUser.nickname);
        const team = await this._teamService.isBoss(invitationCreateDTO.teamId, user);
        if (!team) {
            throw new common_1.UnauthorizedException('Somente o lider do time pode convidar outros jogadores');
        }
        const player = await this._userService.findByNickname(invitationCreateDTO.nickname);
        if (!player) {
            throw new common_1.BadRequestException('Não existe um player com este nickname');
        }
        if (team.members.some(player => player.nickname === invitationCreateDTO.nickname)) {
            throw new common_1.BadRequestException('Este player já faz parte deste time');
        }
        if (await this._invitationModel
            .findOne({ userId: player.userId, teamId: team.teamId, accept: null })
            .exec()) {
            throw new common_1.BadRequestException('Você já fez um convite a este player, aguarde a resposta dele');
        }
        const invitation = new this._invitationModel({
            userId: player.userId,
            teamId: team.teamId,
            teamName: team.team,
        });
        await invitation.save();
        await this._notificationService.create({
            message: `Você recebeu um convite do time ${team.team} acesse a pagina de convites para aceita-lo ou recusar`,
            userId: player.userId,
            link: '/player/invitations',
        });
        await this._notificationService.create({
            message: 'Convite enviado com sucesso!',
            userId: authUser.userId,
        });
        return {
            message: 'Convite enviado com sucesso! Aguarde a resposta do jogador',
        };
    }
    async update(invitationUpdateDTO, authUser) {
        const user = await this._userService.findByNickname(authUser.nickname);
        const invitation = await this._invitationModel
            .findOne({
            userId: user.userId,
            _id: invitationUpdateDTO._id,
        })
            .exec();
        if (!invitation) {
            throw new common_1.BadRequestException('Não foi possivel responder a este convite pois ele não foi encotrado');
        }
        if (invitationUpdateDTO.accept && user.team) {
            throw new common_1.UnauthorizedException(`Você não pode aceitar entrar neste time pois ja faz parte do time ${user.team.team}`);
        }
        let team = null;
        if (invitationUpdateDTO.accept) {
            team = await this._teamService.findById(invitation.teamId);
            if (!team) {
                invitation.accept = false;
                await invitation.save();
                throw new common_1.BadRequestException('Ops! Parece que o time deste convite não exite mais :/');
            }
            if (team.members.length >= 7) {
                throw new common_1.BadRequestException('O numero maximo de 7 integrante foi atingido');
            }
            await this._userService.setTeam(user, team);
            await this._notificationService.create({
                message: `O player ${user.nickname} aceitou seu convite e agora faz parte do seu time`,
                userId: team.boss.userId,
                link: '/player/team',
            });
        }
        invitation.accept = invitationUpdateDTO.accept;
        await invitation.save();
        return {
            message: invitationUpdateDTO.accept
                ? `Agora você faz parte do ${invitation.teamName}`
                : 'Convite recusado com sucesso',
            team,
        };
    }
};
InvitationService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Invitation')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        notification_service_1.NotificationService,
        user_service_1.UserService,
        team_service_1.TeamService])
], InvitationService);
exports.InvitationService = InvitationService;
//# sourceMappingURL=invitation.service.js.map