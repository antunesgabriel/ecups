import { parseISO, isBefore } from 'date-fns';

interface LeagueValid {
  valid: boolean;
  message?: string;
}

export default (league): LeagueValid => {
  const leagueStart = league.leagueStart ? parseISO(league.leagueStart) : null;
  const leagueEnd = league.leagueEnd ? parseISO(league.leagueEnd) : null;

  if (leagueStart && isBefore(leagueStart, new Date())) {
    return {
      valid: false,
      message:
        'A data e hora de inico da liga não pode ser antes de data e hora atual',
    };
  }

  if (leagueEnd && isBefore(leagueEnd, new Date())) {
    return {
      valid: false,
      message:
        'A data e hora de fim da liga não pode ser anterior a data e hora atual',
    };
  }

  if (leagueStart && leagueEnd && isBefore(leagueEnd, leagueStart)) {
    return {
      valid: false,
      message:
        'A data e hora de fim da liga não pode ser anterior a data e hora de inicio da liga',
    };
  }

  return { valid: true };
};
