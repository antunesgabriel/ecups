import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class TeamDTO {
  @IsNotEmpty({ message: 'Informe o nome do time' })
  @IsString()
  team: string;

  @IsOptional()
  @IsString()
  bio: string;
}
