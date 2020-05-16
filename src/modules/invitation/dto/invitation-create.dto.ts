import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class InvitationCreateDTO {
  @IsNotEmpty({
    message: 'Por favor forneça o nickname do jogador que deseja convidar',
  })
  @IsString({ message: 'Formato de nickname inválido' })
  nickname: string;

  @IsNotEmpty({ message: 'Forneça o id do time' })
  @IsNumber()
  teamId: number;
}
