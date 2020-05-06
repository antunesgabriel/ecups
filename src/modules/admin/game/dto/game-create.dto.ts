import { IsString, IsNotEmpty } from 'class-validator';

export class GameCreateDTO {
  @IsNotEmpty({ message: 'Informe o nome do jogo' })
  @IsString()
  game: string;

  logo: string;
}
