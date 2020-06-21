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
const user_service_1 = require("../user/user.service");
const league_service_1 = require("../league/league.service");
const team_service_1 = require("../team/team.service");
const user_interface_1 = require("../../utils/user.interface");
const user_entity_1 = require("../../entities/user.entity");
const league_entity_1 = require("../../entities/league.entity");
const date_fns_1 = require("date-fns");
const participant_service_1 = require("../participant/participant.service");
const notification_service_1 = require("../notification/notification.service");
let SubscriptionService = class SubscriptionService {
    constructor(_subscriptionModel, _userService, _leagueService, _teamService, _participantService, _notificationService) {
        this._subscriptionModel = _subscriptionModel;
        this._userService = _userService;
        this._leagueService = _leagueService;
        this._teamService = _teamService;
        this._participantService = _participantService;
        this._notificationService = _notificationService;
    }
    async index(like, authUser) {
        if (!like) {
            throw new common_1.BadRequestException('Informe como deseja receber a resposta');
        }
        const user = await this._userService.findByNickname(authUser.nickname);
        if (like === 'player') {
            return await this.indexLikeAPlayer(user);
        }
        if (like === 'organizer') {
            return await this.indexLikeAOrganizer(user);
        }
        throw new common_1.BadRequestException('Tipo de listagem não permitido');
    }
    async create(subscriptionDTO, authUser) {
        const user = await this._userService.findByNickname(authUser.nickname);
        const league = await this._leagueService.findById(subscriptionDTO.leagueId);
        if (!league) {
            throw new common_1.BadRequestException('Liga não existe ou foi excluida');
        }
        if (league.user.userId === authUser.userId) {
            throw new common_1.UnauthorizedException('Você não pode se inscrever na sua própia liga');
        }
        if (date_fns_1.isAfter(date_fns_1.parseISO(String(league.leagueStart)), new Date())) {
            throw new common_1.BadRequestException('Esse campeonato já iniciou');
        }
        if (league.forTeams) {
            return await this.subscribeTeam(user, league);
        }
        return await this.subscribePlayer(user, league);
    }
    async update(subscriptionDTO, authUser) {
        const user = await this._userService.findByNickname(authUser.nickname);
        const league = await this._leagueService.findById(subscriptionDTO.leagueId);
        if (!league) {
            throw new common_1.BadRequestException('Liga não encontrada');
        }
        if (league.user.userId !== user.userId) {
            throw new common_1.UnauthorizedException('Somente o criador da liga pode atualiza-la');
        }
        const subscription = await this._subscriptionModel
            .findById(subscriptionDTO._id)
            .exec();
        if (subscriptionDTO.accept) {
            const participants = await this._participantService.findOrCreate(authUser, {
                leagueId: league.leagueId,
                isTeams: league.forTeams,
            });
            if (participants.numberOfParticipants >= league.maxParticipants) {
                throw new common_1.BadRequestException('Numero máximo de participantes na liga foi alcançado');
            }
            let participant = null;
            if (league.forTeams) {
                participant = await this._teamService.findById(subscription.teamId);
            }
            if (!league.forTeams) {
                participant = await this._userService.findByNickname(subscription.player.nickname);
            }
            if (!participant) {
                await this._subscriptionModel.deleteOne({ _id: subscription._id });
                throw new common_1.BadRequestException('O participante referente a essa inscrição não existe mais');
            }
            participants.participants = [...participants.participants, participant];
            participants.numberOfParticipants += 1;
            await participants.save();
            subscription.status = true;
            await subscription.save();
            await this._notificationService.create({
                message: `Sua inscrição no ${league.league} foi aceita! Se prepare para essa batalha que se inicia ${date_fns_1.format(league.leagueStart, 'dd/MM/yyyy HH:mm:ss')}`,
                userId: league.forTeams ? participant.boss.userId : participant.userId,
                link: '/player/subscriptions',
            });
            const requests = await this.indexLikeAOrganizer(user);
            return { message: 'Inscrição aceita com sucesso!', requests };
        }
        subscription.status = false;
        await subscription.save();
        await this._notificationService.create({
            message: `Sua inscrição no ${league.league} foi recusada, não fique triste há muito mais ligas vindo por ai, de uma olhada =D na home`,
            userId: league.forTeams
                ? subscription.team.boss.userId
                : subscription.playerId,
            link: '/',
        });
        const requests = await this.indexLikeAOrganizer(user);
        return { message: 'Inscrição recusada com sucesso!', requests };
    }
    async indexLikeAPlayer(player) {
        if (player.team) {
            return await this._subscriptionModel
                .find({
                $or: [{ playerId: player.userId }, { teamId: player.team.teamId }],
            })
                .sort({ createdAt: 1 })
                .exec();
        }
        return await this._subscriptionModel
            .find({ playerId: player.userId })
            .sort({ createdAt: 1 })
            .exec();
    }
    async indexLikeAOrganizer(organizator) {
        return await this._subscriptionModel
            .find({
            organizerId: organizator.userId,
            status: null,
        })
            .sort({ createdAt: 1 })
            .exec();
    }
    async subscribeTeam(player, league) {
        if (!player.team) {
            throw new common_1.UnauthorizedException('Esse campeonato é para times, crie um time ou entre em um para participar');
        }
        const team = await this._teamService.findById(player.team.teamId);
        if (team.boss.userId !== player.userId) {
            throw new common_1.UnauthorizedException('Somente o lider do time pode inscrever o time no campeonato');
        }
        if (await this._subscriptionModel.findOne({
            teamId: team.teamId,
            leagueId: league.leagueId,
        })) {
            throw new common_1.UnauthorizedException('Seu time já possui inscrição neste campeonato');
        }
        if (team.members.length < 3) {
            throw new common_1.BadRequestException('Seu time precisa ter no minimo 3 integrates para inscrever em campeonatos');
        }
        const newSubscription = new this._subscriptionModel({
            team,
            league,
            teamId: team.teamId,
            leagueId: league.leagueId,
            organizerId: league.user.userId,
        });
        await newSubscription.save();
        return await this.indexLikeAPlayer(player);
    }
    async subscribePlayer(player, league) {
        if (await this._subscriptionModel.findOne({
            playerId: player.userId,
            leagueId: league.leagueId,
        })) {
            throw new common_1.UnauthorizedException('Você já possui inscrição neste campeonato');
        }
        const newSubscription = new this._subscriptionModel({
            player,
            league,
            playerId: player.userId,
            leagueId: league.leagueId,
            organizerId: league.user.userId,
        });
        await newSubscription.save();
        return await this.indexLikeAPlayer(player);
    }
};
SubscriptionService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Subscription')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        league_service_1.LeagueService,
        team_service_1.TeamService,
        participant_service_1.ParticipantService,
        notification_service_1.NotificationService])
], SubscriptionService);
exports.SubscriptionService = SubscriptionService;
//# sourceMappingURL=subscription.service.js.map