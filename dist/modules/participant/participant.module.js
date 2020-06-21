"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const participant_service_1 = require("./participant.service");
const mongoose_1 = require("@nestjs/mongoose");
const participant_schema_1 = require("../../schemas/participant.schema");
const league_module_1 = require("../league/league.module");
let ParticipantModule = class ParticipantModule {
};
ParticipantModule = __decorate([
    common_1.Module({
        providers: [participant_service_1.ParticipantService],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Participant', schema: participant_schema_1.ParticipantSchema },
            ]),
            league_module_1.LeagueModule,
        ],
        exports: [participant_service_1.ParticipantService],
    })
], ParticipantModule);
exports.ParticipantModule = ParticipantModule;
//# sourceMappingURL=participant.module.js.map