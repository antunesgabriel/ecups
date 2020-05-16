import { IsNotEmpty, IsBoolean, IsString } from 'class-validator';

export class InvitationUpdateDTO {
  @IsNotEmpty({ message: 'Informe se aceita ou não o convite' })
  @IsBoolean({ message: 'Tipo de responta invalido' })
  accept: boolean;

  @IsNotEmpty({ message: 'Identificador do convite não informado' })
  @IsString()
  _id: string;
}
