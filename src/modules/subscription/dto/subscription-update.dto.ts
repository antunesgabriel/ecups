import { SubscriptionCreateDTO } from './subscription-create.dto';
import { IsNotEmpty, IsBoolean } from 'class-validator';

export class SubscriptionUpdateDTO extends SubscriptionCreateDTO {
  @IsNotEmpty({ message: 'Informe sua respota para esta inscrição' })
  @IsBoolean()
  accept: boolean;
}
