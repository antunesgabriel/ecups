import { IsNotEmpty, IsNumber } from 'class-validator';

export class RegisterTeamCreateDTO {
  @IsNotEmpty({ message: 'Por favor forneça o id do campeonato' })
  @IsNumber()
  championshipId: number;

  @IsNotEmpty({ message: 'Informação do time invalida' })
  @IsNumber()
  teamId: number;
}
