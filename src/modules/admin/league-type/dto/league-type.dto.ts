import { IsNotEmpty, IsString } from 'class-validator';

export class LeagueTypeDTO {
  @IsNotEmpty({ message: 'Informe o tipo de liga' })
  @IsString()
  type: string;
}
