"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
exports.default = (league) => {
    const leagueStart = league.leagueStart ? date_fns_1.parseISO(league.leagueStart) : null;
    const leagueEnd = league.leagueEnd ? date_fns_1.parseISO(league.leagueEnd) : null;
    if (leagueStart && date_fns_1.isBefore(leagueStart, new Date())) {
        return {
            valid: false,
            message: 'A data e hora de inico da liga não pode ser antes de data e hora atual',
        };
    }
    if (leagueEnd && date_fns_1.isBefore(leagueEnd, new Date())) {
        return {
            valid: false,
            message: 'A data e hora de fim da liga não pode ser anterior a data e hora atual',
        };
    }
    if (leagueStart && leagueEnd && date_fns_1.isBefore(leagueEnd, leagueStart)) {
        return {
            valid: false,
            message: 'A data e hora de fim da liga não pode ser anterior a data e hora de inicio da liga',
        };
    }
    return { valid: true };
};
//# sourceMappingURL=leagueDatesValidate.js.map