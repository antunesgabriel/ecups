import { SubscriptionCreateDTO } from './subscription-create.dto';
import { IsNotEmpty, IsBoolean, IsString } from 'class-validator';

export class SubscriptionUpdateDTO extends SubscriptionCreateDTO {
  @IsNotEmpty({ message: 'Informe sua respota para esta inscrição' })
  @IsBoolean()
  accept: boolean;

  @IsNotEmpty({ message: 'Informe o id da inscrição' })
  @IsString()
  _id: string;
}
