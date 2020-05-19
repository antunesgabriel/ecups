import { IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class ParticipantCreateDTO {
  @IsNotEmpty({ message: 'Informe o id da liga' })
  @IsNumber()
  leagueId: number;

  @IsNotEmpty({ message: 'Informe se o campeonato é para time' })
  @IsBoolean()
  isTeams: boolean;
}
