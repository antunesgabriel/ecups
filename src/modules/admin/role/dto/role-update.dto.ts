import { IsNotEmpty, IsString } from 'class-validator';

export class RoleUpdateDTO {
  @IsNotEmpty({ message: 'Forneça um nome para função' })
  @IsString()
  role: string;
}
