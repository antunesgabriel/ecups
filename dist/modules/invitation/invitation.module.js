"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const invitation_controller_1 = require("./invitation.controller");
const invitation_service_1 = require("./invitation.service");
const mongoose_1 = require("@nestjs/mongoose");
const invitation_schema_1 = require("../../schemas/invitation.schema");
const notification_module_1 = require("../notification/notification.module");
const team_module_1 = require("../team/team.module");
const user_module_1 = require("../user/user.module");
let InvitationModule = class InvitationModule {
};
InvitationModule = __decorate([
    common_1.Module({
        controllers: [invitation_controller_1.InvitationController],
        providers: [invitation_service_1.InvitationService],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Invitation', schema: invitation_schema_1.InvitationSchema },
            ]),
            notification_module_1.NotificationModule,
            user_module_1.UserModule,
            team_module_1.TeamModule,
        ],
    })
], InvitationModule);
exports.InvitationModule = InvitationModule;
//# sourceMappingURL=invitation.module.js.map