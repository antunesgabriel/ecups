import { IsString, IsNotEmpty } from 'class-validator';
import { UserCreateDTO } from '@modules/user/dto/user-create.dto';

export class AdminCreateDTO extends UserCreateDTO {
  @IsNotEmpty({ message: 'Forneça a key' })
  @IsString()
  key: string;
}
