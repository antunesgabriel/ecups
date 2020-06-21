"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const subscription_controller_1 = require("./subscription.controller");
const subscription_service_1 = require("./subscription.service");
const mongoose_1 = require("@nestjs/mongoose");
const subscription_schema_1 = require("../../schemas/subscription.schema");
const user_module_1 = require("../user/user.module");
const team_module_1 = require("../team/team.module");
const league_module_1 = require("../league/league.module");
const participant_module_1 = require("../participant/participant.module");
const notification_module_1 = require("../notification/notification.module");
let SubscriptionModule = class SubscriptionModule {
};
SubscriptionModule = __decorate([
    common_1.Module({
        controllers: [subscription_controller_1.SubscriptionController],
        providers: [subscription_service_1.SubscriptionService],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Subscription', schema: subscription_schema_1.SubscriptionSchema },
            ]),
            user_module_1.UserModule,
            team_module_1.TeamModule,
            league_module_1.LeagueModule,
            participant_module_1.ParticipantModule,
            notification_module_1.NotificationModule,
        ],
    })
], SubscriptionModule);
exports.SubscriptionModule = SubscriptionModule;
//# sourceMappingURL=subscription.module.js.map