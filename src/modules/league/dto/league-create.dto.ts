import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class LeagueCreateDTO {
  @IsNotEmpty({ message: 'Informe o titulo da liga' })
  @IsString()
  league: string;

  @IsOptional()
  @IsString()
  rules: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'Informe se o campeonato terá jogo de ida e volta' })
  @IsBoolean()
  roundTrip: boolean;

  @IsOptional()
  @IsNumber()
  maxParticipants: number;

  @IsNotEmpty({ message: 'Informe se a liga é para time ou player' })
  @IsBoolean()
  forTeams: boolean;

  @IsOptional()
  @IsDateString()
  leagueStart: Date;

  @IsOptional()
  @IsDateString()
  leagueEnd: Date;

  @IsNotEmpty({
    message:
      'Informe se a liga necessita de informações de localização dos jogadores',
  })
  @IsBoolean()
  needAddress: boolean;

  @IsNotEmpty({ message: 'Informe o tipo da liga' })
  @IsNumber()
  leagueTypeId: number;

  @IsNotEmpty({ message: 'Informe o game da liga' })
  @IsNumber()
  gameId: number;
}
