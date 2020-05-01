import { IsNotEmpty, IsString } from 'class-validator';

export class TeamUpdateDTO {
  @IsNotEmpty({ message: 'Defina um nome para o time' })
  @IsString()
  public name?: string;

  @IsNotEmpty({
    message: 'Forneça uma descrição ou um grito de guerra para o time.',
  })
  @IsString()
  public warCry?: string;
}
