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
const league_service_1 = require("../league/league.service");
const user_interface_1 = require("../../utils/user.interface");
const user_entity_1 = require("../../entities/user.entity");
let ParticipantService = class ParticipantService {
    constructor(_participantModel, _leagueService) {
        this._participantModel = _participantModel;
        this._leagueService = _leagueService;
    }
    async create(participantDTO, authUser) {
        const league = await this._leagueService.findById(participantDTO.leagueId, authUser.userId);
        if (!league) {
            throw new common_1.BadRequestException('Essa liga não existe');
        }
        const participant = new this._participantModel(Object.assign(Object.assign({}, participantDTO), { creatorId: authUser.userId }));
        return await participant.save();
    }
    async update() {
        return true;
    }
    async find(creatorId, leagueId) {
        const participant = await this._participantModel
            .findOne({ creatorId, leagueId })
            .exec();
        return participant;
    }
    async findOrCreate(authUser, participantDTO) {
        let participants = await this.find(authUser.userId, participantDTO.leagueId);
        if (!participants) {
            participants = await this.create(participantDTO, authUser);
        }
        return participants;
    }
    async count(user) {
        const count = await this._participantModel
            .find({
            $or: [
                { 'participants.userId': user.userId },
                { 'participants.members.userId': user.userId },
            ],
        })
            .exec();
        return count.length;
    }
};
ParticipantService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel('Participant')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        league_service_1.LeagueService])
], ParticipantService);
exports.ParticipantService = ParticipantService;
//# sourceMappingURL=participant.service.js.map