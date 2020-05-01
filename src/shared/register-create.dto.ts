import { IsNotEmpty, IsNumber } from 'class-validator';

export class RegisterCreateDTO {
  @IsNotEmpty({
    message: 'Por favor forneça o campeonato que deseja se inscrever',
  })
  @IsNumber()
  public championshipId: number;
}
