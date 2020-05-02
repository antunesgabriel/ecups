import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class InvitationPlayerCreateDTO {
  @IsNotEmpty({ message: 'Informe o nickname do player destinatário' })
  @IsString()
  nickName: string;

  @IsNotEmpty({ message: 'Informe o id do time' })
  @IsNumber()
  teamId: number;

  @IsOptional()
  @IsString()
  message: string;
}
