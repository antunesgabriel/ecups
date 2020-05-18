import { IsNotEmpty, IsNumber } from 'class-validator';

export class SubscriptionCreateDTO {
  @IsNotEmpty({ message: 'Informe a liga que deseja se inscrever' })
  @IsNumber()
  leagueId: number;
}
