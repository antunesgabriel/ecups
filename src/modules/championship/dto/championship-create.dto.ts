import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class ChampionshipCreateDTO {
  @IsNotEmpty({ message: 'Informe um nome para o campeonato' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Informe uma descrição para o campeonato' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'Informe as regras do campeonato' })
  @IsString()
  rules: string;

  @IsNotEmpty({ message: 'Informe a data de inicio das inscrições' })
  @IsDateString({ message: 'Data de inicio das inscrições inválida' })
  registrationsStart: string;

  @IsOptional()
  @IsDateString({ message: 'Data de fim das inscrições inválida' })
  registrationsEnd: string;

  // @IsNotEmpty({ message: 'Informe a data de inicio do campeonato' })
  @IsOptional()
  @IsDateString({ message: 'Data de inicio do campeonato inválida' })
  start: string;

  @IsNotEmpty({
    message: 'Informe se o campeonato é para time ou jogadores individuais',
  })
  @IsBoolean({ message: 'Valor de campo para time deve ser do tipo boolean' })
  forTeams: boolean;
}
