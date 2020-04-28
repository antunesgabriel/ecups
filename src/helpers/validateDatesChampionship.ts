import { parseISO, isBefore, isAfter } from 'date-fns';
import { BadRequestException } from '@nestjs/common';

interface ChampionshipDates {
  registrationsStart: Date;
  registrationsEnd?: Date | null;
  start?: Date | null;
}

export default (championship): ChampionshipDates => {
  const registrationsStart = parseISO(championship.registrationsStart);
  const registrationsEnd = championship.registrationsEnd
    ? parseISO(championship.registrationsEnd)
    : null;
  const start = championship.start ? parseISO(championship.start) : null;

  if (isBefore(registrationsStart, new Date())) {
    throw new BadRequestException(
      'A data e hora de inicio das inscrições não pode ser anterior a data e hora atual',
    );
  }

  if (registrationsEnd && isBefore(registrationsEnd, new Date())) {
    throw new BadRequestException(
      'A data e hora de fim das inscrições não pode ser anterior a data e hora atual',
    );
  }

  if (isBefore(registrationsEnd, registrationsStart)) {
    throw new BadRequestException(
      'A data e hora de fim das inscrições não pode ser anterior a data e hora do inicio das inscrições',
    );
  }

  if (isBefore(start, new Date())) {
    throw new BadRequestException(
      'A e hora de inicio do campeonato não pode ser anterior a data e hora atual',
    );
  }

  if (isBefore(start, registrationsStart)) {
    throw new BadRequestException(
      'A e hora de inicio do campeonato não pode ser anterior a data e hora de inicio das inscrições',
    );
  }

  if (isAfter(registrationsEnd, start)) {
    throw new BadRequestException(
      'A data e hora de fim das inscrições não pode ser posterior ao inicio do campeonato',
    );
  }

  return { registrationsStart, registrationsEnd, start };
};
