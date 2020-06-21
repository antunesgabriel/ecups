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
const typeorm_1 = require("typeorm");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const multerConfigs_1 = require("./configs/multerConfigs");
const TypeOrmModuleConfig_1 = require("./configs/TypeOrmModuleConfig");
const MongooseConfig_1 = require("./configs/MongooseConfig");
const admin_module_1 = require("./modules/admin/admin/admin.module");
const auth_module_1 = require("./modules/auth/auth.module");
const game_module_1 = require("./modules/admin/game/game.module");
const role_module_1 = require("./modules/admin/role/role.module");
const user_module_1 = require("./modules/user/user.module");
const avatar_module_1 = require("./modules/avatar/avatar.module");
const address_module_1 = require("./modules/address/address.module");
const league_type_module_1 = require("./modules/admin/league-type/league-type.module");
const league_module_1 = require("./modules/league/league.module");
const league_thumb_module_1 = require("./modules/league-thumb/league-thumb.module");
const home_module_1 = require("./modules/admin/home/home.module");
const team_module_1 = require("./modules/team/team.module");
const team_shield_module_1 = require("./modules/team-shield/team-shield.module");
const notification_module_1 = require("./modules/notification/notification.module");
const invitation_module_1 = require("./modules/invitation/invitation.module");
const subscription_module_1 = require("./modules/subscription/subscription.module");
const participant_module_1 = require("./modules/participant/participant.module");
const player_home_module_1 = require("./modules/player-home/player-home.module");
let AppModule = class AppModule {
    constructor(connection, mongooseConnection) {
        this.connection = connection;
        this.mongooseConnection = mongooseConnection;
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            TypeOrmModuleConfig_1.default,
            MongooseConfig_1.default,
            platform_express_1.MulterModule.register({ storage: multerConfigs_1.multerStorage }),
            admin_module_1.AdminModule,
            auth_module_1.AuthModule,
            game_module_1.GameModule,
            role_module_1.RoleModule,
            user_module_1.UserModule,
            avatar_module_1.AvatarModule,
            address_module_1.AddressModule,
            league_type_module_1.LeagueTypeModule,
            league_module_1.LeagueModule,
            league_thumb_module_1.LeagueThumbModule,
            home_module_1.HomeModule,
            team_module_1.TeamModule,
            team_shield_module_1.TeamShieldModule,
            notification_module_1.NotificationModule,
            invitation_module_1.InvitationModule,
            subscription_module_1.SubscriptionModule,
            participant_module_1.ParticipantModule,
            player_home_module_1.PlayerHomeModule,
        ],
    }),
    __param(1, mongoose_1.InjectConnection()),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        mongoose_2.Connection])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map