import { IsNotEmpty, IsString } from 'class-validator';

export class TeamDTO {
  @IsNotEmpty({ message: 'Informe o nome do time' })
  @IsString()
  team: string;
}
