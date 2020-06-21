"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const role_entity_1 = require("../entities/role.entity");
const league_entity_1 = require("../entities/league.entity");
const leagueType_entity_1 = require("../entities/leagueType.entity");
const game_entity_1 = require("../entities/game.entity");
const address_entity_1 = require("../entities/address.entity");
const team_entity_1 = require("../entities/team.entity");
exports.default = typeorm_1.TypeOrmModule.forRoot({
    type: 'postgres',
    host: String(process.env.APP_DB_HOST),
    port: parseInt(process.env.APP_DB_PORT),
    username: String(process.env.APP_DB_USER),
    password: String(process.env.APP_DB_PASS),
    database: String(process.env.APP_DB_NAME),
    entities: [
        user_entity_1.UserEntity,
        role_entity_1.RoleEntity,
        league_entity_1.LeagueEntity,
        leagueType_entity_1.LeagueTypeEntity,
        game_entity_1.GameEntity,
        address_entity_1.AddressEntity,
        team_entity_1.TeamEntity,
    ],
    synchronize: true,
});
//# sourceMappingURL=TypeOrmModuleConfig.js.map