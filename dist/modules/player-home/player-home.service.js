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
const league_repository_1 = require("../league/league.repository");
const participant_service_1 = require("../participant/participant.service");
const user_interface_1 = require("../../utils/user.interface");
const user_service_1 = require("../user/user.service");
let PlayerHomeService = class PlayerHomeService {
    constructor(_leagueRepository, _participantService, _userService) {
        this._leagueRepository = _leagueRepository;
        this._participantService = _participantService;
        this._userService = _userService;
    }
    async show(authUser) {
        const user = await this._userService.findByNickname(authUser.nickname);
        const leaguesCount = await this._leagueRepository.count({
            where: { user },
            relations: ['user'],
        });
        const participations = await this._participantService.count(user);
        return { leaguesCount, participations };
    }
};
PlayerHomeService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(league_repository_1.LeagueRepository)),
    __metadata("design:paramtypes", [league_repository_1.LeagueRepository,
        participant_service_1.ParticipantService,
        user_service_1.UserService])
], PlayerHomeService);
exports.PlayerHomeService = PlayerHomeService;
//# sourceMappingURL=player-home.service.js.map