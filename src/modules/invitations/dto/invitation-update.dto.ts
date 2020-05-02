import { IsNotEmpty, IsNumber, IsBoolean, IsString } from 'class-validator';

export class InvitationPlayerUpdateDTO {
  @IsNotEmpty({ message: 'Informe o id do time' })
  @IsNumber()
  teamId: number;

  @IsNotEmpty({ message: 'Informe sua resposta' })
  @IsBoolean()
  accept: boolean;

  @IsNotEmpty({ message: 'Informe a ID do convite' })
  @IsString()
  _id: string;
}
